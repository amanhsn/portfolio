import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { caseStudyBySlug, caseStudySlugs } from "@/content/case-studies";
import { FadeIn } from "@/components/case-study/fade-in";
import { HeroBlock, ProductShot } from "@/components/case-study/hero-block";
import { ContextBlock } from "@/components/case-study/context-block";
import { ProblemBlock } from "@/components/case-study/problem-block";
import { ConstraintsBlock } from "@/components/case-study/constraints-block";
import { DecisionsBlock } from "@/components/case-study/decisions-block";
import { CraftBand } from "@/components/case-study/craft-band";
import { ShippedGrid } from "@/components/case-study/shipped-grid";
import { OutcomeBlock } from "@/components/case-study/outcome-block";
import { LearningsBlock } from "@/components/case-study/learnings-block";
import { NextBlock } from "@/components/case-study/next-block";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyBySlug[slug];
  if (!cs) return {};
  return { title: cs.seo.title, description: cs.seo.description };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = caseStudyBySlug[slug];
  if (!cs) notFound();

  return (
    <>
      <Navbar />
      <main className="relative w-full overflow-x-clip pb-24">
        {/* Rhythm: white → … → dark (craft) → white → tinted (learnings) → white */}
        <HeroBlock hero={cs.hero} />
        <ProductShot
          src={cs.hero.productShot.src}
          alt={cs.hero.productShot.alt}
          aspect={cs.hero.productShot.aspect}
          video={cs.hero.productShot.video}
        />

        <FadeIn><ContextBlock context={cs.context} /></FadeIn>
        <FadeIn><ProblemBlock problem={cs.problem} /></FadeIn>
        <FadeIn><ConstraintsBlock constraints={cs.constraints} /></FadeIn>
        <FadeIn><DecisionsBlock decisions={cs.decisions} /></FadeIn>

        <CraftBand craft={cs.craft} />

        <FadeIn><ShippedGrid screens={cs.shipped} /></FadeIn>
        <FadeIn><OutcomeBlock outcome={cs.outcome} /></FadeIn>

        <LearningsBlock learnings={cs.learnings} />

        <FadeIn><NextBlock next={cs.next} /></FadeIn>
      </main>
      <Footer />
    </>
  );
}
