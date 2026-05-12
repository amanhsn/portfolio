import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface InlineLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  cursorText?: string;
}

export function InlineLink({
  href,
  children,
  external,
  className,
  cursorText,
}: InlineLinkProps) {
  const cls = cn(
    "inline-flex items-baseline gap-0.5 t-link text-fg hover:underline underline-offset-4 decoration-[var(--fg-subtle)]",
    className,
  );
  const inner = (
    <>
      {children}
      {external && (
        <ArrowUpRight
          size={12}
          strokeWidth={1.75}
          className="translate-y-px text-fg-subtle"
          aria-hidden
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        data-cursor-text={cursorText}
      >
        {inner}
      </a>
    );
  }

  return (
    <NextLink href={href} className={cls} data-cursor-text={cursorText}>
      {inner}
    </NextLink>
  );
}
