import { cn } from "@/lib/cn";

export function Pill({
  children,
  active,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-pill)] border px-2.5 transition-colors",
        active
          ? "border-[var(--border)] bg-[var(--pill-bg-active)]"
          : "border-transparent bg-transparent hover:border-[var(--border)] hover:bg-[var(--pill-bg-active)]",
        className,
      )}
    >
      {children}
    </button>
  );
}
