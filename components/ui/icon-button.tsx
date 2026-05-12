import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface IconButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  cursorText?: string;
}

export const IconButton = forwardRef<HTMLAnchorElement, IconButtonProps>(
  ({ label, cursorText, className, children, ...rest }, ref) => {
    return (
      <a
        ref={ref}
        aria-label={label}
        data-cursor-text={cursorText ?? label}
        {...rest}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border)] text-fg-muted transition-colors hover:bg-[var(--pill-bg-active)] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
          className,
        )}
      >
        {children}
      </a>
    );
  },
);
IconButton.displayName = "IconButton";
