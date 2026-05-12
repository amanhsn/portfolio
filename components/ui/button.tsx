import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  trailingArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      trailingArrow,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const base =
      "inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-pill)] border px-2.5 t-meta transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

    const variants: Record<Variant, string> = {
      primary:
        "border-[var(--border)] bg-[var(--bg)] text-fg hover:bg-[var(--pill-bg-active)]",
      ghost:
        "border-transparent bg-transparent text-fg hover:bg-[var(--pill-bg-active)]",
      icon: "h-8 w-8 justify-center border-[var(--border)] bg-[var(--bg)] p-0 hover:bg-[var(--pill-bg-active)]",
    };

    return (
      <button
        ref={ref}
        {...rest}
        className={cn(base, variants[variant], className)}
      >
        {children}
        {trailingArrow && (
          <span
            className="ml-0.5 inline-flex h-[22px] w-7 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--tag-bg)] text-fg-muted"
            aria-hidden
          >
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </span>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";
