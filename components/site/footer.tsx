/**
 * Footer - Figma 84:7770.
 * Desktop: copyright + link row inline. Mobile: stack vertically with smaller gap.
 */
const LINKS = [
  { label: "BEHANCE", href: "https://behance.net/amanhsn" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/amanhsn" },
  { label: "CV", href: "https://aman-resume.vercel.app" },
  {
    label: "SPOTIFY",
    href: "https://open.spotify.com/user/pibcpyd0xmdn1wo1xq5kzow9y",
  },
];

export function Footer() {
  return (
    <footer className="relative w-full">
      <div className="mx-auto flex w-full max-w-[1441px] flex-col items-start gap-6 border-t border-[var(--border-subtle)] px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between md:gap-6 md:px-[80px] md:py-[64px] lg:px-[104.5px]">
        {/* Left - copy */}
        <p className="t-footer-body">
          Designed &amp; Developed with <span aria-hidden>❤️</span> by{" "}
          <a
            href="https://twitter.com/amanhsn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[var(--text-tertiary)] underline-offset-2"
            data-cursor-text="Twitter"
          >
            @amanhsn
          </a>
        </p>

        {/* Right - uppercase mono links */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-[32px]">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={
                l.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              data-cursor-text={l.label.charAt(0) + l.label.slice(1).toLowerCase()}
              className="t-footer-link transition-opacity hover:opacity-70"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
