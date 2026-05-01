import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StoryBand } from "@/components/StoryBand";
import { Listen } from "@/components/Listen";
import { Friends } from "@/components/Friends";
import { Reviews } from "@/components/Reviews";
import { Pricing } from "@/components/Pricing";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import {
  buildAudiobookJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pooshie · A bedtime audiobook for young & grown-up children",
  description:
    "Pooshie is a 13-chapter children's audiobook (2h 14m) for ages 4–8. Real human narration, gentle stories about a little pink hedgehog whose spines don't prick. Free chapter 1 — no signup, no email required.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAudiobookJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd()) }}
      />

      <Header />
      <main>
        <Hero />
        <StoryBand />
        <Listen />
        <Friends />
        <Reviews />
        <Pricing />
        <FaqSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
