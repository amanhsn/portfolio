import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/sections/hero";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { Footer } from "@/components/site/footer";
import { AsteriskDecoration } from "@/components/site/asterisk-decoration";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex w-full flex-col items-center gap-[64px] pb-[64px] pt-[32px] md:gap-[96px] md:pb-[96px] md:pt-[64px]">
        {/* Top-right corner asterisk decoration (Figma Frame 5) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 mx-auto w-full max-w-[1441px]">
          <AsteriskDecoration position="top-right" />
        </div>
        {/* Bottom-left corner — appears near last project */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-full max-w-[1441px]">
          <AsteriskDecoration position="bottom-left" />
        </div>

        <Hero />
        {projects.map((project) => (
          <ProjectShowcase key={project.slug} project={project} />
        ))}
      </main>
      <Footer />
    </>
  );
}
