import { cn } from "@/lib/cn";

export function Divider({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <span
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "block bg-[var(--divider)]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
