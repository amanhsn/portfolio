import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1280px] px-5 md:px-12 lg:px-20",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
