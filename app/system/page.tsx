import { Github, Linkedin, MessageSquare, Palette } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Pill } from "@/components/ui/pill";
import { NavLink } from "@/components/ui/nav-link";
import { IconButton } from "@/components/ui/icon-button";
import { InlineLink } from "@/components/ui/link-inline";
import { MediaFrame } from "@/components/ui/media-frame";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const swatches: { name: string; varName: string }[] = [
  { name: "bg", varName: "--bg" },
  { name: "bg-elevated", varName: "--bg-elevated" },
  { name: "bg-muted", varName: "--bg-muted" },
  { name: "fg", varName: "--fg" },
  { name: "fg-muted", varName: "--fg-muted" },
  { name: "fg-subtle", varName: "--fg-subtle" },
  { name: "border", varName: "--border" },
  { name: "border-strong", varName: "--border-strong" },
  { name: "accent", varName: "--accent" },
  { name: "divider", varName: "--divider" },
];

const typeScale: { cls: string; label: string; sample: string }[] = [
  { cls: "t-h2", label: "H2 · Satoshi Bold 20/24 · -0.2", sample: "ImagineArt Film Studio" },
  { cls: "t-subhead", label: "Subhead · Satoshi Bold 18/28.8 · -0.2", sample: "Section subhead" },
  { cls: "t-body", label: "Body · Satoshi Regular 16/25.6", sample: "Body paragraph text in the design system." },
  { cls: "t-meta", label: "Meta · Satoshi Medium 14/20.25", sample: "Meta label" },
  { cls: "t-eyebrow", label: "Eyebrow · JetBrains Mono Medium 14/14 · 0.47", sample: "EYEBROW · MONO" },
  { cls: "t-link", label: "Link · JetBrains Mono Medium 14/14", sample: "inline-link" },
  { cls: "t-mono-xs", label: "Mono XS · DM Mono Medium 10/12 · 2.8", sample: "NUMERIC TAG" },
];

export default function SystemPage() {
  return (
    <main>
      <Section>
        <Container className="space-y-3">
          <Eyebrow>design system</Eyebrow>
          <h1 className="t-h2">Tokens, primitives, and motion</h1>
          <p className="t-body text-fg-muted max-w-prose">
            Visual review surface. Toggle theme via the button below — every
            token, primitive, and the global custom cursor should flip in
            place. Hover any element with a label to see the cursor pill.
          </p>
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Colors */}
      <Section>
        <Container className="space-y-6">
          <Eyebrow>color · semantic tokens</Eyebrow>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {swatches.map((s) => (
              <div
                key={s.name}
                className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border)]"
                data-cursor-text={s.varName}
              >
                <div
                  className="h-20"
                  style={{ background: `var(${s.varName})` }}
                />
                <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                  <span className="t-meta">{s.name}</span>
                  <span className="t-mono-xs text-fg-subtle">
                    {s.varName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Typography */}
      <Section>
        <Container className="space-y-6">
          <Eyebrow>typography</Eyebrow>
          <div className="space-y-6">
            {typeScale.map((t) => (
              <div key={t.cls} className="grid grid-cols-[200px_1fr] gap-6">
                <span className="t-mono-xs text-fg-subtle">{t.label}</span>
                <span className={t.cls}>{t.sample}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Primitives */}
      <Section>
        <Container className="space-y-8">
          <Eyebrow>primitives</Eyebrow>

          {/* Buttons */}
          <div className="space-y-3">
            <span className="t-mono-xs text-fg-subtle">Button</span>
            <div className="flex flex-wrap items-center gap-3">
              <Button data-cursor-text="Primary action">Get in Touch</Button>
              <Button trailingArrow data-cursor-text="With arrow">
                Get in Touch
              </Button>
              <Button variant="ghost" data-cursor-text="Ghost variant">
                Ghost
              </Button>
              <Button variant="icon" data-cursor-text="Icon button" aria-label="icon">
                <MessageSquare size={14} strokeWidth={1.75} />
              </Button>
            </div>
          </div>

          {/* NavLinks */}
          <div className="space-y-3">
            <span className="t-mono-xs text-fg-subtle">NavLink</span>
            <div className="flex flex-wrap items-center gap-2">
              <NavLink href="#" active badge={1}>
                Work
              </NavLink>
              <NavLink href="#" badge={2}>
                About
              </NavLink>
              <NavLink href="#" badge={3}>
                Fun
              </NavLink>
              <NavLink href="#" badge="external" external>
                Resume
              </NavLink>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <span className="t-mono-xs text-fg-subtle">Tag</span>
            <div className="flex items-center gap-2">
              <Tag variant="number" value={1} />
              <Tag variant="number" value={2} />
              <Tag variant="number" value={9} />
              <Tag variant="arrow" />
            </div>
          </div>

          {/* Pills */}
          <div className="space-y-3">
            <span className="t-mono-xs text-fg-subtle">Pill</span>
            <div className="flex items-center gap-2">
              <Pill active>Active</Pill>
              <Pill>Inactive</Pill>
              <Pill>Inactive hover me</Pill>
            </div>
          </div>

          {/* Icon buttons */}
          <div className="space-y-3">
            <span className="t-mono-xs text-fg-subtle">IconButton (socials)</span>
            <div className="flex items-center gap-3">
              <IconButton
                href="#"
                label="LinkedIn"
                cursorText="Open LinkedIn"
              >
                <Linkedin size={14} strokeWidth={1.75} />
              </IconButton>
              <IconButton
                href="#"
                label="Behance"
                cursorText="Open Behance"
              >
                <Palette size={14} strokeWidth={1.75} />
              </IconButton>
              <IconButton
                href="#"
                label="GitHub"
                cursorText="Open GitHub"
              >
                <Github size={14} strokeWidth={1.75} />
              </IconButton>
            </div>
          </div>

          {/* Inline link */}
          <div className="space-y-3">
            <span className="t-mono-xs text-fg-subtle">InlineLink</span>
            <p className="t-body">
              I currently work at{" "}
              <InlineLink
                href="https://imagine.art"
                external
                cursorText="ImagineArt"
              >
                ImagineArt
              </InlineLink>{" "}
              based out of Islamabad, Pakistan.
            </p>
          </div>

          {/* MediaFrame */}
          <div className="space-y-3">
            <span className="t-mono-xs text-fg-subtle">MediaFrame (hover for label)</span>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MediaFrame
                cursorText="A beautiful forest"
                className="aspect-[4/3]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                  alt="Forest reflection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </MediaFrame>
              <MediaFrame
                cursorText="Mountain at sunset"
                className="aspect-[4/3]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
                  alt="Mountain at sunset"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </MediaFrame>
            </div>
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <p className="t-meta text-fg-subtle">
            End of system preview. Move the cursor across any element above.
          </p>
        </Container>
      </Section>
    </main>
  );
}
