import Link from "next/link";
import { PiArrowRight, PiPackage, PiHandGrabbing, PiDrop, PiArrowsClockwise, PiThermometerCold, PiCalendarCheck, PiLockKey } from "react-icons/pi";
import PageHero from "../../../components/pages/PageHero";
import BottleAnatomy from "../../../components/howitworks/BottleAnatomy";
import HowItWorks from "../../../components/home/HowItWorks";
import WhyOneColor from "../../../components/home/WhyOneColor";
import FaqSection from "../../../components/home/FaqSection";
import InViewVideo from "../../../components/ui/InViewVideo";
import Reveal, { RevealItem } from "../../../components/ui/Reveal";
import { getProduct } from "../../../data/products";
import { FAQS } from "../../../data/content";
import { VIDEO } from "../../../data/media";
import styles from "./page.module.scss";

export const metadata = {
  title: "How the one-click bottle works",
  description:
    "Inside the OneColor dual-chamber bottle: colour cream and developer stay sealed apart until you click, then mix 1:1 inside. Open, apply, store and reuse for up to 4 months.",
  alternates: { canonical: "/how-it-works" },
};

const OPEN_STEPS = [
  { icon: PiPackage, title: "Open the box", body: "Press the half-moon notch on the side and pull the tab up. No scissors, no tearing the card." },
  { icon: PiHandGrabbing, title: "Glove up", body: "Our gloves are thicker, textured nitrile, so they won't tear mid-application. Spare pairs are in every box." },
  { icon: PiArrowsClockwise, title: "Click & shake", body: "Twist the collar until it clicks, then shake five times. The colour is ready." },
  { icon: PiDrop, title: "Part & press", body: "Press gently and trace the nozzle along each parting, roots first. Comb through, then wait 30 minutes." },
];

const STORE = [
  { icon: PiLockKey, title: "Close it tight", body: "Wipe the nozzle and twist the cap shut. The seal stops air from getting in." },
  { icon: PiThermometerCold, title: "Keep it cool & upright", body: "In a cupboard, not on a sunny sill or a steamy bathroom shelf." },
  { icon: PiCalendarCheck, title: "Note the date", body: "Write the click date on the label. Use the rest within 4 months.*" },
];

export default function HowItWorksPage() {
  const shade = getProduct("burgundy-wine");
  const bottleFaqs = FAQS.find((g) => g.cat === "The bottle")?.items || [];

  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            The bottle that <em>does the mixing.</em>
          </>
        }
        lede="Most hair colour asks you to be a chemist: two bottles, a bowl, a brush and a guess. OneColor keeps colour cream and developer in two sealed chambers, then blends them in a perfect 1:1 the moment you click."
        aside={<BottleAnatomy shade={shade} />}
      >
        <div className={styles.facts}>
          <span>
            <strong>1:1</strong> exact ratio
          </span>
          <span>
            <strong>0</strong> bowls or brushes
          </span>
          <span>
            <strong>4</strong> months reusable*
          </span>
        </div>
      </PageHero>

      <HowItWorks shade={shade} compact />

      <section className={`section ${styles.open}`} id="open" aria-labelledby="open-title">
        <div className={`container ${styles.openGrid}`}>
          <Reveal className={styles.openMedia}>
            <div className={styles.arch}>
              <InViewVideo src={VIDEO.application.src} poster={VIDEO.application.poster} label="Colour being combed through hair" />
            </div>
            <p className="ph-note">Placeholder clip: the client&apos;s 40-second &ldquo;how to open &amp; use&rdquo; video goes here</p>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">How to open &amp; use</p>
              <h2 id="open-title" className={styles.h2}>
                Forty seconds, <em>start to click.</em>
              </h2>
              <p className={styles.lede}>You told us the box was fiddly and the gloves were thin. We fixed both. Here&apos;s the whole routine.</p>
            </Reveal>
            <Reveal stagger as="ol" className={styles.openSteps}>
              {OPEN_STEPS.map((s, i) => (
                <RevealItem as="li" key={s.title} className={styles.openStep}>
                  <span className={styles.openIcon} aria-hidden="true">
                    <s.icon />
                  </span>
                  <div>
                    <h3>
                      <span className={styles.openN}>{String(i + 1).padStart(2, "0")}</span> {s.title}
                    </h3>
                    <p>{s.body}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`section ${styles.store}`} aria-labelledby="store-title">
        <div className="container">
          <div className={styles.storeHead}>
            <Reveal>
              <p className="eyebrow">Reusable for up to 4 months*</p>
              <h2 id="store-title" className={styles.h2}>
                Use what you need. <em>Keep the rest.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className={styles.lede}>Mixed box dye has to be thrown away within the hour. A clicked OneColor bottle stays sealed between uses, so most people get two to four root touch-ups from one bottle.</p>
            </Reveal>
          </div>

          <Reveal className={styles.timeline} aria-hidden="true">
            {["Month 1", "Month 2", "Month 3", "Month 4"].map((m, i) => (
              <div key={m} className={styles.tick}>
                <span className={styles.tickDot} style={{ "--fill": `${100 - i * 25}%` }} />
                <span className={styles.tickLabel}>{m}</span>
                <span className={styles.tickNote}>{i === 0 ? "Full colour" : `Root touch-up ${i}`}</span>
              </div>
            ))}
          </Reveal>

          <Reveal stagger className={styles.storeCards}>
            {STORE.map((s) => (
              <RevealItem key={s.title} className={styles.storeCard}>
                <s.icon aria-hidden="true" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </RevealItem>
            ))}
          </Reveal>
          <p className={styles.claim}>* Reuse period and number of applications depend on hair length and storage. Claim pending final approval.</p>
        </div>
      </section>

      <WhyOneColor />

      <FaqSection items={bottleFaqs} eyebrow="About the bottle" title={<>Bottle questions, <em>answered.</em></>} />

      <section className={styles.cta} aria-labelledby="hiw-cta">
        <div className={`container ${styles.ctaInner}`}>
          <h2 id="hiw-cta" className={styles.ctaTitle}>
            Ready for your <em>first click?</em>
          </h2>
          <Link href="/shop?category=hair-colour" className={styles.ctaBtn}>
            Shop the shades <PiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
