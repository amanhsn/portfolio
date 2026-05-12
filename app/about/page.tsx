import { Navbar } from "@/components/site/navbar";
import { About } from "@/components/sections/about";
import { Footer } from "@/components/site/footer";
import { AsteriskDecoration } from "@/components/site/asterisk-decoration";

export const metadata = {
  title: "About — Aman's Portfolio",
};

export default function AboutPage() {
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
        <About />
      </main>
      <Footer />
    </>
  );
}
