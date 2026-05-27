/**
 * Inline, theme-aware case-study diagrams. Built from tokens (--border / --bg-muted
 * / --text-*) so they flip with light/dark automatically. Selected by string key
 * from the case study data (`decision.diagram`, `craft.visual`).
 */

const card =
  "rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-muted)]";
const chip =
  "rounded-[var(--radius-pill)] border border-[var(--border)] px-3 py-1 text-[13px] text-fg-muted";

function Tag({ children }: { children: React.ReactNode }) {
  return <span className={chip}>{children}</span>;
}

/** Decision 01 - prompt box (recall) vs. side panel (recognition). */
function PromptVsPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
      {/* Prompt box */}
      <div className={`${card} flex flex-col gap-3 p-5`}>
        <span className="t-mono-xs text-fg-subtle">Prompt · type and hope</span>
        <div className="rounded-[var(--radius-sm)] border border-dashed border-[var(--border)] p-3 text-[14px] text-fg-subtle">
          a cool action scene with cinematic lighting<span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-[var(--text-tertiary)]" />
        </div>
        <span className="text-[13px] text-fg-subtle">Output is a guess. Failure is hard to diagnose.</span>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-center text-fg-subtle">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" aria-hidden className="rotate-90 sm:rotate-0">
          <path d="M2 12h34m0 0-7-7m7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Side panel */}
      <div className={`${card} flex flex-col gap-2 p-5`}>
        <span className="t-mono-xs text-fg-subtle">Side panel · see and choose</span>
        {[
          ["Camera", "35mm anamorphic"],
          ["Movement", "Push-in"],
          ["Lighting", "Noir"],
          ["Genre", "Action"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-[var(--border)] px-3 py-1.5">
            <span className="text-[13px] text-fg-muted">{k}</span>
            <span className="text-[13px] font-medium text-fg">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Decision 02 - five output types share one canvas. */
function OutputTypes() {
  const types = ["Clip", "Still", "B-roll", "Scene jump", "Storyboard"];
  return (
    <div className={`${card} p-5`}>
      <span className="t-mono-xs text-fg-subtle">One project · five output types</span>
      <div className="mt-3 flex flex-wrap gap-2">
        {types.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  );
}

/** Decision 03 - controls on top, swappable model underneath. */
function ModelAgnostic() {
  const models = ["Seedance 2.0", "Veo 4", "Kling", "Runway"];
  return (
    <div className={`${card} flex flex-col gap-3 p-5`}>
      <div className="flex flex-wrap gap-2">
        {["Camera", "Movement", "Genre"].map((c) => (
          <Tag key={c}>{c}</Tag>
        ))}
        <span className="self-center text-[13px] text-fg-subtle">what the user picks</span>
      </div>
      <div className="flex items-center gap-2 text-fg-subtle">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden>
          <path d="M12 2v14m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[13px]">shell picks the best model for today</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {models.map((m, i) => (
          <span
            key={m}
            className={
              i === 0
                ? "rounded-[var(--radius-pill)] border border-[var(--accent)] px-3 py-1 text-[13px] text-[var(--accent)]"
                : chip
            }
          >
            {m}
          </span>
        ))}
        <span className="self-center text-[13px] text-fg-subtle">swap without redesign</span>
      </div>
    </div>
  );
}

/** Craft visual (dark band) - one control, annotated. White-on-dark tuned. */
function ControlAnatomy() {
  return (
    <div className="mx-auto flex max-w-[520px] flex-col gap-6">
      <div className="rounded-[var(--radius-md)] border border-white/15 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-medium text-white">Camera</span>
          <span className="rounded-[var(--radius-pill)] border border-white/20 px-3 py-1 text-[13px] text-white/70">
            35mm anamorphic
          </span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <p className="text-[13px] leading-relaxed text-white/55">
          <span className="mb-1 block font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.18em] text-white/40">
            Plain label
          </span>
          A first-time creator reads &quot;Camera&quot; and knows exactly what it controls.
        </p>
        <p className="text-[13px] leading-relaxed text-white/55">
          <span className="mb-1 block font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.18em] text-white/40">
            Film term
          </span>
          A working DP reads &quot;35mm anamorphic&quot; and trusts the system speaks their language.
        </p>
      </div>
    </div>
  );
}

/** Power Zone decision 01 - five industries, each mapped to the solution it gets. */
function ApplicationsIa() {
  const rows: Array<[string, string]> = [
    ["Utility companies", "Grid-scale diesel + BESS"],
    ["Data centers", "Zero-failure backup power"],
    ["Commercial buildings", "Right-sized generators"],
    ["Government", "Compliant, serviced fleets"],
    ["Residential developers", "Hybrid inverter + storage"],
  ];
  return (
    <div className={`${card} p-5`}>
      <span className="t-mono-xs text-fg-subtle">Application-first IA</span>
      <div className="mt-3 flex flex-col gap-2">
        {rows.map(([industry, solution]) => (
          <div
            key={industry}
            className="flex flex-col gap-1 rounded-[var(--radius-sm)] border border-[var(--border)] px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-[14px] font-medium text-fg">{industry}</span>
            <span className="flex items-center gap-2 text-[13px] text-fg-muted">
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden className="hidden shrink-0 sm:block">
                <path d="M1 6h16m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {solution}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-fg-subtle">
        The buyer&apos;s industry is the entry point. The product is the answer, not the menu.
      </p>
    </div>
  );
}

/**
 * Upscale monthly volume, real Mixpanel data (Creative Upscaler event,
 * Imagine Web - Prod). Launch spike Nov 2024, peak Dec 2024, long taper.
 */
function UpscaleGrowth() {
  const data: Array<[string, number]> = [
    ["Nov", 55661], ["Dec", 107690], ["Jan", 106504], ["Feb", 83023],
    ["Mar", 88550], ["Apr", 78199], ["May", 78206], ["Jun", 67137],
    ["Jul", 63507], ["Aug", 51231], ["Sep", 30601], ["Oct", 14631],
    ["Nov", 9624], ["Dec", 5308], ["Jan", 5315], ["Feb", 2002],
    ["Mar", 1046], ["Apr", 424], ["May", 243],
  ];
  const max = 107690;
  return (
    <div className={`${card} p-5`}>
      <div className="flex items-baseline justify-between">
        <span className="t-mono-xs text-fg-subtle">Upscales per month</span>
        <span className="t-mono-xs text-fg-subtle">launch to 2026</span>
      </div>
      <div className="mt-4 flex h-[160px] items-end gap-[3px]">
        {data.map(([m, v], i) => (
          <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
            <div
              className="w-full rounded-t-[2px] bg-[var(--accent)] transition-opacity"
              style={{ height: `${Math.max((v / max) * 100, 1.5)}%` }}
              title={`${v.toLocaleString()} upscales`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-fg-subtle">
        <span>Launch</span>
        <span>107,690 peak</span>
        <span>2026</span>
      </div>
    </div>
  );
}

/**
 * Assist decision 01 - one plain-language prompt, classified into the right
 * task, then handed the logical next step. Mirrors the live "Considering
 * Image Generation" / "Determining Aspect Ratio" intent badges.
 */
function AssistIntent() {
  const routes = ["Generate image", "Generate video", "Answer + advise"];
  const next = ["Variation", "Upscale", "Animate"];
  return (
    <div className={`${card} flex flex-col gap-3 p-5`}>
      <div className="rounded-[var(--radius-sm)] border border-dashed border-[var(--border)] p-3 text-[14px] text-fg-muted">
        &ldquo;A cat in a tiny yellow raincoat, studio photo&rdquo;
      </div>
      <div className="flex items-center gap-2 text-fg-subtle">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden>
          <path d="M12 2v14m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[13px]">Assist reads the intent, picks the task and the model</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {routes.map((r, i) => (
          <span
            key={r}
            className={
              i === 0
                ? "rounded-[var(--radius-pill)] border border-[var(--accent)] px-3 py-1 text-[13px] text-[var(--accent)]"
                : chip
            }
          >
            {r}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-3">
        <span className="t-mono-xs text-fg-subtle">then offers the next step</span>
        {next.map((n) => (
          <Tag key={n}>{n}</Tag>
        ))}
      </div>
    </div>
  );
}

/**
 * Assist monthly volume, real Mixpanel data ("One Chat - Agent" event,
 * Imagine Web - Prod). Launch Jan 2026, peak Feb, then a steady plateau.
 * May is a partial month (through the 27th).
 */
function AssistGrowth() {
  const data: Array<[string, number]> = [
    ["Jan", 86377], ["Feb", 191796], ["Mar", 152006], ["Apr", 172617], ["May", 96742],
  ];
  const max = 191796;
  return (
    <div className={`${card} p-5`}>
      <div className="flex items-baseline justify-between">
        <span className="t-mono-xs text-fg-subtle">Assist interactions per month</span>
        <span className="t-mono-xs text-fg-subtle">2026</span>
      </div>
      <div className="mt-4 flex h-[160px] items-end gap-3">
        {data.map(([, v], i) => (
          <div key={i} className="flex h-full flex-1 flex-col justify-end">
            <div
              className="w-full rounded-t-[2px] bg-[var(--accent)]"
              style={{ height: `${Math.max((v / max) * 100, 1.5)}%` }}
              title={`${v.toLocaleString()} interactions`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3">
        {data.map(([m, v], i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
            <span className="t-mono-xs text-fg">{(v / 1000).toFixed(0)}K</span>
            <span className="text-[11px] text-fg-subtle">{m}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-fg-subtle">
        Launched January, peaked at ~192K in February, then held a six-figure plateau. May is partial (through the 27th).
      </p>
    </div>
  );
}

const REGISTRY: Record<string, () => React.ReactElement> = {
  "upscale-growth": UpscaleGrowth,
  "prompt-vs-panel": PromptVsPanel,
  "output-types": OutputTypes,
  "model-agnostic": ModelAgnostic,
  "control-anatomy": ControlAnatomy,
  "applications-ia": ApplicationsIa,
  "assist-intent": AssistIntent,
  "assist-growth": AssistGrowth,
};

export function Diagram({ name }: { name?: string }) {
  if (!name) return null;
  const Cmp = REGISTRY[name];
  return Cmp ? <Cmp /> : null;
}
