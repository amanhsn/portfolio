"use client";

import { useEffect, useRef, useState } from "react";
import {
  CircleDot,
  Eraser,
  Highlighter,
  Pen,
  RotateCcw,
  RotateCw,
  SprayCan,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { AsteriskLogo } from "@/components/ui/asterisk-logo";

/**
 * "Leave a mark" - a Fabric.js drawing pad. Type a name, draw (pen, colors,
 * size, eraser, undo, clear), submit once. One submission per person is
 * enforced server-side (signed cookie + hashed IP) by /api/garden; the client
 * just shows a locked state when the mark_done cookie is present or the API
 * returns 409.
 */

const COLORS = ["#111111", "#8a3ffc", "#ff4d4f", "#0a9d4a", "#ff8a00", "#2f6bff"];
const PAPER = "#ffffff";

const BRUSHES = [
  { id: "pen", label: "Pen", Icon: Pen },
  { id: "marker", label: "Marker", Icon: Highlighter },
  { id: "spray", label: "Spray", Icon: SprayCan },
  { id: "dots", label: "Dots", Icon: CircleDot },
] as const;
type BrushId = (typeof BRUSHES)[number]["id"];

function hexToRgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

type Status = "idle" | "submitting" | "done" | "locked" | "error";

export function PlaygroundCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fabricRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nsRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const redoRef = useRef<any[]>([]);
  const restoringRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [brush, setBrush] = useState<BrushId>("pen");
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(4);
  const [erasing, setErasing] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");

  // Instant locked state if they've already submitted (server is authoritative).
  useEffect(() => {
    if (document.cookie.split("; ").some((c) => c.startsWith("mark_done="))) {
      setStatus("locked");
    }
  }, []);

  // Init Fabric (lazy import - it touches window).
  useEffect(() => {
    if (status === "locked") return;
    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let canvas: any;
    (async () => {
      const fabric = await import("fabric");
      if (disposed || !canvasElRef.current || !wrapRef.current) return;
      const w = Math.floor(wrapRef.current.clientWidth);
      const h = Math.round(w * 0.6);
      canvas = new fabric.Canvas(canvasElRef.current, {
        isDrawingMode: true,
        backgroundColor: PAPER,
        width: w,
        height: h,
      });
      nsRef.current = fabric;
      const pencil = new fabric.PencilBrush(canvas);
      pencil.color = color;
      pencil.width = size;
      canvas.freeDrawingBrush = pencil;
      // Fabric v7 ignores the constructor backgroundColor - set it explicitly so
      // the pad (and the exported PNG) is white paper, not transparent.
      canvas.backgroundColor = PAPER;
      canvas.renderAll();
      // A fresh stroke invalidates the redo stack (but not our own redo re-adds).
      canvas.on("object:added", () => {
        if (!restoringRef.current) redoRef.current = [];
      });
      fabricRef.current = canvas;
      setReady(true);
    })();
    return () => {
      disposed = true;
      if (canvas) canvas.dispose();
      fabricRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status === "locked"]);

  // Rebuild the brush whenever type / color / size / eraser changes.
  useEffect(() => {
    const c = fabricRef.current;
    const fabric = nsRef.current;
    if (!c || !fabric) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let b: any;
    if (erasing) {
      b = new fabric.PencilBrush(c);
      b.color = PAPER;
      b.width = Math.max(size, 14);
    } else if (brush === "spray") {
      b = new fabric.SprayBrush(c);
      b.color = color;
      b.width = size * 3;
      b.density = 14;
    } else if (brush === "dots") {
      b = new fabric.CircleBrush(c);
      b.color = color;
      b.width = size;
    } else if (brush === "marker") {
      b = new fabric.PencilBrush(c);
      b.color = hexToRgba(color, 0.4);
      b.width = size * 3;
    } else {
      b = new fabric.PencilBrush(c);
      b.color = color;
      b.width = size;
    }
    c.freeDrawingBrush = b;
  }, [brush, color, size, erasing, ready]);

  const undo = () => {
    const c = fabricRef.current;
    if (!c) return;
    const objs = c.getObjects();
    if (objs.length) {
      const last = objs[objs.length - 1];
      c.remove(last);
      redoRef.current.push(last);
      c.renderAll();
    }
  };

  const redo = () => {
    const c = fabricRef.current;
    if (!c) return;
    const obj = redoRef.current.pop();
    if (obj) {
      restoringRef.current = true;
      c.add(obj);
      restoringRef.current = false;
      c.renderAll();
    }
  };

  const clearAll = () => {
    const c = fabricRef.current;
    if (!c) return;
    c.clear();
    c.backgroundColor = PAPER;
    redoRef.current = [];
    c.renderAll();
  };

  const submit = async () => {
    const c = fabricRef.current;
    if (!c) return;
    if (name.trim().length < 1) {
      setErr("Add your name first.");
      return;
    }
    if (c.getObjects().length === 0) {
      setErr("Draw something first.");
      return;
    }
    setErr("");
    setStatus("submitting");
    const dataUrl = c.toDataURL({ format: "png", multiplier: 1 });
    try {
      const res = await fetch("/api/garden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), dataUrl }),
      });
      if (res.ok) {
        setStatus("done");
      } else if (res.status === 409) {
        setStatus("locked");
      } else {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setErr(j.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErr("Network error. Try again.");
      setStatus("error");
    }
  };

  if (status === "locked") {
    return <EndState title="One per person" body="Looks like you've already doodled. Thanks for stopping by." />;
  }
  if (status === "done") {
    return <EndState title="Doodle Submitted" body="Your doodle is saved. Thanks for leaving one." />;
  }

  const submitting = status === "submitting";

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-1">
          {BRUSHES.map((br) => (
            <button
              key={br.id}
              type="button"
              onClick={() => {
                setBrush(br.id);
                setErasing(false);
              }}
              data-cursor-text={br.label}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-pill)] border px-2.5 text-[12px] transition-colors",
                !erasing && brush === br.id
                  ? "border-[var(--text-primary)] bg-[var(--pill-bg-active)] text-fg"
                  : "border-[var(--border-default)] text-fg-muted hover:text-fg",
              )}
            >
              <br.Icon size={13} strokeWidth={1.75} />
              {br.label}
            </button>
          ))}
        </div>

        <span className="h-5 w-px bg-[var(--border-default)]" />

        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Color ${c}`}
              onClick={() => {
                setColor(c);
                setErasing(false);
              }}
              className={cn(
                "h-6 w-6 rounded-full border transition-transform",
                !erasing && color === c
                  ? "scale-110 border-[var(--text-primary)]"
                  : "border-[var(--border-default)] hover:scale-105",
              )}
              style={{ background: c }}
            />
          ))}
        </div>

        <span className="h-5 w-px bg-[var(--border-default)]" />

        <div className="flex items-center gap-2.5 text-fg-subtle">
          <span className="font-[family-name:var(--font-inter)] text-[12px]">Size</span>
          <input
            type="range"
            min={1}
            max={28}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            aria-label="Brush size"
            className="pg-range w-28"
          />
          <span className="flex h-7 w-7 shrink-0 items-center justify-center">
            <span
              className="rounded-full"
              style={{
                width: Math.max(4, Math.min(size, 22)),
                height: Math.max(4, Math.min(size, 22)),
                background: erasing ? "var(--text-tertiary)" : color,
              }}
            />
          </span>
        </div>

        <span className="h-5 w-px bg-[var(--border-default)]" />

        <button
          type="button"
          onClick={() => setErasing((v) => !v)}
          data-cursor-text={erasing ? "Eraser on" : "Eraser"}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 text-[13px] transition-colors",
            erasing
              ? "border-[var(--text-primary)] bg-[var(--pill-bg-active)] text-fg"
              : "border-[var(--border-default)] text-fg-muted hover:text-fg",
          )}
        >
          <Eraser size={14} strokeWidth={1.75} /> Eraser
        </button>
        <button
          type="button"
          onClick={undo}
          data-cursor-text="Undo"
          className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--border-default)] px-3 text-[13px] text-fg-muted transition-colors hover:text-fg"
        >
          <RotateCcw size={14} strokeWidth={1.75} /> Undo
        </button>
        <button
          type="button"
          onClick={redo}
          data-cursor-text="Redo"
          className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--border-default)] px-3 text-[13px] text-fg-muted transition-colors hover:text-fg"
        >
          <RotateCw size={14} strokeWidth={1.75} /> Redo
        </button>
        <button
          type="button"
          onClick={clearAll}
          data-cursor-text="Clear"
          className="inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--border-default)] px-3 text-[13px] text-fg-muted transition-colors hover:text-fg"
        >
          <Trash2 size={14} strokeWidth={1.75} /> Clear
        </button>
      </div>

      {/* Canvas pad */}
      <div
        ref={wrapRef}
        data-cursor-native
        className="w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]"
      >
        <canvas ref={canvasElRef} className="block" />
      </div>

      {/* Name + submit */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value={name}
          maxLength={40}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-10 w-full rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 font-[family-name:var(--font-inter)] text-[15px] text-fg placeholder:text-fg-subtle focus:border-[var(--text-primary)] focus:outline-none sm:w-auto sm:flex-1"
        />
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          data-cursor-text="Submit"
          className="h-10 rounded-[var(--radius-md)] bg-[var(--text-primary)] px-6 font-[family-name:var(--font-sans)] text-[15px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit doodle"}
        </button>
      </div>

      <p className="font-[family-name:var(--font-inter)] text-[12px] text-fg-subtle">
        {err ? (
          <span className="text-[var(--text-accent-red)]">{err}</span>
        ) : (
          "One doodle per person. No account needed."
        )}
      </p>
    </div>
  );
}

function EndState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-16 text-center shadow-[var(--shadow-card)]">
      <AsteriskLogo size={28} className="text-fg-subtle" />
      <h3 className="font-[family-name:var(--font-sans)] text-[20px] font-medium text-fg">
        {title}
      </h3>
      <p className="max-w-[420px] font-[family-name:var(--font-inter)] text-[14px] leading-relaxed text-fg-muted">
        {body}
      </p>
    </div>
  );
}
