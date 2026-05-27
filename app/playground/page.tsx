import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { AsteriskDecoration } from "@/components/site/asterisk-decoration";
import { PlaygroundBento } from "@/components/sections/playground-bento";

export const metadata = {
  title: "Playground · Aman's Portfolio",
  description: "Side projects, ideas, and vibecoded experiments.",
};

export default function PlaygroundPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex w-full flex-col items-center gap-[64px] pb-[80px] pt-[32px] md:gap-[96px] md:pb-[120px] md:pt-[64px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto w-full max-w-[1441px]">
          <AsteriskDecoration position="top-right" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-full max-w-[1441px]">
          <AsteriskDecoration position="bottom-left" />
        </div>

        <section className="flex w-full flex-col items-center gap-[40px] px-5 sm:px-8 lg:px-[80px]">
          <div className="flex w-full max-w-[1280px] flex-col items-start gap-[16px] sm:p-[12px]">
            {/* Heading - SIDE PROJECTS, IDEAS & VIBECODED 'SLOP' */}
            <h1 className="t-hero-name text-[17px] tracking-[2.2px] sm:text-[20px] sm:tracking-[2.8px]">
              <span>Side projects, ideas &amp; vibecoded </span>
              <span className="italic" style={{ color: "var(--text-accent-green)" }}>
                &lsquo;slop&rsquo;
              </span>
            </h1>

            {/* Body */}
            <p className="t-hero-body w-full text-[15px] leading-[24px] sm:text-[20px] sm:leading-normal">
              I max out my claude plan for fun, trying out different ideas &amp;
              building plugins, extensions and web apps for utility which help me
              in my design process. Every idea that I design, I try vibe coding it
              entirely. This helps me understand certain constraints I might be
              overlooking during ideation.
            </p>

            {/* CTA */}
            <p className="t-hero-body pt-[8px] text-[15px] leading-[24px] sm:text-[18px] sm:leading-[28.8px]">
              Working on something cool? Say hi via{" "}
              <a
                href="https://linkedin.com/in/amanhsn"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="LinkedIn"
                className="underline decoration-[var(--text-tertiary)] underline-offset-4 transition-colors duration-200 hover:text-fg-muted"
              >
                LinkedIn
              </a>{" "}
              ·{" "}
              <a
                href="mailto:syedamanhsn@gmail.com"
                data-cursor-text="Email"
                className="underline decoration-[var(--text-tertiary)] underline-offset-4 transition-colors duration-200 hover:text-fg-muted"
              >
                email
              </a>
            </p>
          </div>

          {/* Bento grid - vibecoded side projects */}
          <div className="w-full max-w-[1280px] sm:px-[12px]">
            <PlaygroundBento />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
