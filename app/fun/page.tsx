import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { AsteriskDecoration } from "@/components/site/asterisk-decoration";
import { MixtapesGrid } from "@/components/sections/mixtapes-grid";
import { getMixtapes } from "@/lib/spotify";

// Revalidate hourly — keeps mixtapes fresh without hammering the Spotify API
export const revalidate = 3600;

export const metadata = {
  title: "Fun — Aman's Portfolio",
  description: "Mixtapes, playlists, and what I've been listening to.",
};

export default async function FunPage() {
  const mixtapes = await getMixtapes();

  return (
    <>
      <Navbar />
      <main className="relative flex w-full flex-col items-center gap-[64px] pt-[32px] md:gap-[96px] md:pt-[64px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto w-full max-w-[1441px]">
          <AsteriskDecoration position="top-right" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-full max-w-[1441px]">
          <AsteriskDecoration position="bottom-left" />
        </div>

        <section className="flex w-full flex-col items-center gap-[40px] px-5 sm:px-8 lg:px-[80px]">
          {/* Heading */}
          <div className="flex w-full max-w-[1280px] flex-col items-start gap-[16px] sm:p-[12px]">
            <h1 className="t-hero-name text-[17px] tracking-[2.2px] sm:text-[20px] sm:tracking-[2.8px]">
              <span>Mixtapes &amp; </span>
              <span style={{ color: "var(--text-accent-red)" }}>quiet</span>
              <span> obsessions</span>
            </h1>
            <p className="t-hero-body w-full text-[15px] leading-[24px] sm:text-[20px] sm:leading-normal">
              The corner of my brain that doesn&rsquo;t care about products
              &mdash; just sound. Hand-curated playlists, the playlists that
              fixed bad weeks, and what&rsquo;s currently on rotation.
            </p>
            <p className="t-meta text-fg-subtle">
              Click any mixtape to open. Listed in no particular order, except
              by mood.
            </p>
          </div>

          {/* Grid */}
          <div className="flex w-full max-w-[1280px] flex-col items-start sm:px-[12px]">
            <MixtapesGrid mixtapes={mixtapes} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
