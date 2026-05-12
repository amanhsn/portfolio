import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type TagProps =
  | {
      variant: "number";
      value: number | string;
      className?: string;
    }
  | {
      variant: "arrow";
      className?: string;
    };

export function Tag(props: TagProps) {
  const base =
    "inline-flex h-5 min-w-5 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--tag-bg)] px-1 text-fg-muted";

  if (props.variant === "arrow") {
    return (
      <span className={cn(base, "w-6", props.className)} aria-hidden>
        <ArrowUpRight size={12} strokeWidth={1.75} />
      </span>
    );
  }

  return (
    <span className={cn(base, "t-mono-xs tracking-normal", props.className)}>
      {props.value}
    </span>
  );
}
