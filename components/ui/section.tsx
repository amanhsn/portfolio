import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-12 md:py-16 lg:py-20", className)}
    >
      {children}
    </section>
  );
}
