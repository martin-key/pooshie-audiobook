import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StoryBand } from "@/components/StoryBand";
import { Listen } from "@/components/Listen";
import { Friends } from "@/components/Friends";
import { Reviews } from "@/components/Reviews";
import { GetTheAudiobook } from "@/components/GetTheAudiobook";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { localizeChapters } from "@/lib/chapters";
import { CHAPTER_1_AUDIO, STOREFRONTS } from "@/lib/links";
import { alternateLanguages, getDictionary, hasLocale, localePath } from "@/lib/i18n";
import { buildAudiobookJsonLd, buildFaqJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    title: t.homeTitle,
    description: t.homeDescription,
    alternates: { canonical: localePath(lang), languages: alternateLanguages() },
  };
}

export default async function HomePage({ params }: Params) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const chapters = localizeChapters(dict.chapters);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAudiobookJsonLd(lang)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(lang)) }}
      />

      <Header locale={lang} t={dict.header} common={dict.common} />
      <main>
        <Hero dict={dict} firstChapter={chapters[0]} />
        <StoryBand dict={dict} />
        <Listen
          locale={lang}
          t={dict.listen}
          common={dict.common}
          regions={dict.platforms.regions}
          leadForm={dict.leadForm}
          chapters={chapters}
          featured={STOREFRONTS[lang].featured}
          audioSrc={CHAPTER_1_AUDIO[lang].src}
        />
        <Friends dict={dict} />
        <Reviews dict={dict} />
        <GetTheAudiobook locale={lang} dict={dict} />
        <FaqSection dict={dict} />
        <FinalCTA locale={lang} dict={dict} />
      </main>
      <Footer locale={lang} dict={dict} />
      <MobileStickyCTA listenFree={dict.common.listenFree} getIt={dict.mobileSticky.getIt} />
    </>
  );
}
