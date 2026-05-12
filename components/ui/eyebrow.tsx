import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  size = "sm",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "xs" | "sm";
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={cn(
        size === "xs" ? "t-mono-xs" : "t-eyebrow",
        "text-fg-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
