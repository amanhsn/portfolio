/**
 * Brand icon set — Behance, Spotify, CV.
 *
 * Behance + Spotify use their official SimpleIcons paths (filled with
 * `currentColor`) so they read as proper brand marks alongside lucide-react.
 * CV is a custom file-with-person glyph to read clearly as "resume".
 */

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function BehanceIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path d="M7.799 5.698c.589 0 1.12.051 1.606.156.484.102.901.273 1.247.507.346.235.616.55.808.95.187.398.286.89.286 1.475 0 .63-.144 1.155-.43 1.575-.286.42-.71.764-1.267 1.032.755.218 1.317.6 1.687 1.143.37.546.554 1.205.554 1.974 0 .622-.124 1.158-.367 1.61-.245.453-.578.825-.991 1.115-.413.29-.886.51-1.412.654-.526.144-1.074.214-1.643.214H0V5.698h7.799zM3.358 9.78h2.876c.527 0 .956-.123 1.286-.376.331-.252.5-.659.5-1.225 0-.314-.057-.572-.171-.773a1.281 1.281 0 0 0-.464-.5 1.91 1.91 0 0 0-.668-.234 4.225 4.225 0 0 0-.788-.066H3.358V9.78zm.176 4.231h3.276c.272 0 .532-.04.778-.111.246-.07.464-.179.654-.328.19-.149.34-.341.452-.578.112-.236.169-.523.169-.86 0-.66-.184-1.13-.554-1.413-.37-.282-.86-.423-1.471-.423H3.534v3.713zM18.69 14.5c.49.5 1.198.75 2.122.75.66 0 1.234-.168 1.713-.504.477-.336.769-.69.875-1.066h2.49c-.394 1.232-1.013 2.124-1.85 2.66-.83.538-1.84.806-3.013.806-.821 0-1.566-.131-2.226-.394-.66-.262-1.225-.633-1.681-1.115-.46-.482-.81-1.064-1.061-1.74-.246-.674-.371-1.415-.371-2.225 0-.788.128-1.519.385-2.196.255-.674.617-1.262 1.083-1.733a4.939 4.939 0 0 1 1.696-1.151c.66-.281 1.391-.421 2.196-.421.9 0 1.682.175 2.354.519.673.346 1.219.812 1.643 1.396.424.585.732 1.262.916 2.024.183.762.247 1.572.183 2.422h-7.331c0 .869.327 1.689.873 2.169zm3.659-5.6c-.387-.426-1.013-.65-1.834-.65-.536 0-.98.086-1.327.273-.346.183-.624.42-.831.7-.21.282-.357.578-.43.886a3.21 3.21 0 0 0-.103.671h4.927c-.073-.769-.342-1.345-.795-1.755-.16-.14-.32-.063-.32-.063l-.287-.062zM21.227 4.072H16.41v1.5h4.817v-1.5z" />
    </svg>
  );
}

export function SpotifyIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12A12 12 0 0 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.42-1.02.6-1.56.3z" />
    </svg>
  );
}

/**
 * CV / Resume — line icon (matches lucide stroke-style for visual harmony).
 * A document with a small person silhouette inside.
 */
export function CvIcon({ size = 18, strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {/* document outline */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      {/* person head + shoulders */}
      <circle cx="12" cy="13.5" r="1.5" />
      <path d="M9 18.5a3 3 0 0 1 6 0" />
    </svg>
  );
}
