import Hero from "../../components/home/Hero";
import ShadeWall from "../../components/home/ShadeWall";
import ColourStudio from "../../components/studio/ColourStudio";
import HowItWorks from "../../components/home/HowItWorks";
import Results from "../../components/home/Results";
import StepStack from "../../components/home/StepStack";
import Manifesto from "../../components/home/Manifesto";
import WhyOneColor from "../../components/home/WhyOneColor";
import RitualRail from "../../components/home/RitualRail";
import ReviewsSection from "../../components/home/ReviewsSection";
import FaqSection from "../../components/home/FaqSection";
import JournalSection from "../../components/home/JournalSection";
import { LAUNCH_SHADES, ALL_SHADES, getProduct } from "../../data/products";
import { FAQS, POSTS } from "../../data/content";

const HOME_FAQ_QS = [
  "Do I need a patch test?",
  "Will it cover 100% grey?",
  "Does it work on all hair types?",
  "How long does the colour last?",
  "Can I really reuse it?",
  "Do you offer cash on delivery?",
];

export default function HomePage() {
  const allFaqs = FAQS.flatMap((g) => g.items);
  const homeFaqs = HOME_FAQ_QS.map((q) => allFaqs.find((f) => f.q === q)).filter(Boolean);
  const upcoming = ALL_SHADES.filter((s) => s.status === "coming-soon");
  const ritual = ["complete-colour-kit", "root-touch-up-duo", "colour-lock-conditioner", "nitrile-gloves"].map(getProduct);

  return (
    <>
      <Hero shades={LAUNCH_SHADES} />
      <ShadeWall shades={LAUNCH_SHADES} upcoming={upcoming} />
      <ColourStudio shades={LAUNCH_SHADES} />
      <HowItWorks shade={getProduct("burgundy-wine")} />
      <Results />
      <StepStack />
      <Manifesto />
      <WhyOneColor />
      <RitualRail products={ritual} />
      <ReviewsSection />
      <FaqSection items={homeFaqs} />
      <JournalSection posts={POSTS} />
    </>
  );
}
