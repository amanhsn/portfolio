/** Small up-right arrow used on live links (↗). Inherits currentColor. */
export function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
      className="shrink-0"
    >
      <path d="M7 17L17 7M10 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
