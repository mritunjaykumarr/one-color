import Image from "next/image";
import Link from "next/link";
import { PiArrowRight, PiLeaf, PiRecycle, PiHandHeart, PiUsersThree } from "react-icons/pi";
import PageHero from "../../../components/pages/PageHero";
import Reveal, { RevealItem } from "../../../components/ui/Reveal";
import { IMG } from "../../../data/media";
import { FOUNDER_NOTE } from "../../../data/content";
import styles from "./page.module.scss";

export const metadata = {
  title: "Our story",
  description:
    "OneColor brings a German-engineered, one-click hair colour bottle to India. Two halves, one colour: made for Indian hair, every age from 23 to 60, with no mess and no waste.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: PiLeaf, title: "Kinder formula", body: "Ammonia-free and vegan,* pH-balanced for the scalp. Rich colour shouldn't come with a headache." },
  { icon: PiRecycle, title: "Nothing wasted", body: "Click, use what you need, close it. No half-bowls of mixed dye down the drain." },
  { icon: PiHandHeart, title: "Honest proof", body: "Real hair, real ages, verified reviews only. If a shade isn't right, we help you fix it." },
  { icon: PiUsersThree, title: "Every age", body: "From the first grey at 23 to full silver at 60. For women and men, mothers and sons." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Two halves. <em>One colour.</em>
          </>
        }
        lede="Colouring your hair at home has always meant mixing, measuring, staining and guessing. We thought it should feel more like a ritual and less like chemistry."
        image={IMG.sisters}
      />

      <section className={`section ${styles.story}`} aria-labelledby="story-title">
        <div className={`container ${styles.storyGrid}`}>
          <Reveal className={styles.statement}>
            <span className={styles.mark} aria-hidden="true" />
            <h2 id="story-title" className={styles.big}>
              In most Indian homes, colour day is a <em>family ritual.</em> An aunt with the brush, a daughter checking the parting, an old towel nobody minds staining.
            </h2>
          </Reveal>
          <Reveal className={styles.storyText} delay={0.08}>
            <p>
              We loved the ritual and hated the mess. Two bottles, a bowl, a brush, a ratio you hoped you got right, and half a batch of mixed dye going down the sink because it can&apos;t be saved.
            </p>
            <p>
              Then we found a bottle, engineered in Germany, that keeps colour cream and developer in two sealed chambers. One click, and they meet in a perfect 1:1. You use what you need and close it for next time. It had already won people over abroad. We knew it belonged here.
            </p>
            <p>So we reformulated the shades for Indian hair: deeper blacks, warmer browns, and reds that glow on dark bases. We named it OneColor, because two halves becoming one is the whole idea.</p>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.indian}`} aria-labelledby="indian-title">
        <div className={`container ${styles.indianGrid}`}>
          <Reveal stagger className={styles.mosaic}>
            {[IMG.combing, IMG.saltPepper, IMG.auntySari, IMG.youngDark].map((img, i) => (
              <RevealItem key={img.src} className={`${styles.tile} ${styles[`t${i}`]}`}>
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 900px) 24vw, 45vw" />
              </RevealItem>
            ))}
          </Reveal>
          <Reveal className={styles.indianCopy} delay={0.06}>
            <p className="eyebrow">Made for Indian hair</p>
            <h2 id="indian-title" className={styles.h2}>
              Thick, fine, curly, henna-treated, <em>fully grey.</em>
            </h2>
            <ul className={styles.points}>
              <li>
                <strong>Tuned for dark bases.</strong> Shades are developed to show on black and dark-brown hair, not just on European blondes.
              </li>
              <li>
                <strong>Tested on real greys.</strong> Temples, partings and full silver, across ages 23 to 60.
              </li>
              <li>
                <strong>Warm-skin flattering.</strong> Undertones chosen for the golden and olive skin tones most of us have.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.bottle}`} aria-labelledby="bottle-title">
        <div className={`container ${styles.bottleGrid}`}>
          <Reveal className={styles.bottleCopy}>
            <p className={`eyebrow ${styles.lightEyebrow}`}>The bottle</p>
            <h2 id="bottle-title" className={styles.h2}>
              German-engineered. <em>Indian-loved.</em>
            </h2>
            <p>
              The patented* dual-chamber system is made in Germany to pharmaceutical tolerances, so the ratio is exact every time, from the first click to the last touch-up four months later.*
            </p>
            <Link href="/how-it-works" className={styles.lightBtn}>
              See how it works <PiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal className={styles.bottlePhoto} delay={0.08}>
            <Image src={IMG.gloveApply.src} alt={IMG.gloveApply.alt} fill sizes="(min-width: 900px) 45vw, 90vw" />
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.values}`} aria-labelledby="values-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow">What we stand for</p>
            <h2 id="values-title" className={styles.h2}>
              Four promises, <em>one bottle.</em>
            </h2>
          </Reveal>
          <Reveal stagger className={styles.valueGrid}>
            {VALUES.map((v) => (
              <RevealItem key={v.title} className={styles.value}>
                <v.icon aria-hidden="true" />
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.founder}`} aria-label="A note from our founder">
        <div className={`container ${styles.founderInner}`}>
          <span className={styles.mark} aria-hidden="true" />
          <blockquote className={styles.quote}>&ldquo;{FOUNDER_NOTE.quote}&rdquo;</blockquote>
          <p className={styles.by}>
            {FOUNDER_NOTE.name} · {FOUNDER_NOTE.role}
          </p>
          <div className={styles.ctas}>
            <Link href="/shop?category=hair-colour" className={styles.ctaBtn}>
              Find your shade <PiArrowRight aria-hidden="true" />
            </Link>
            <Link href="/reviews" className={styles.ctaLink}>
              Read real reviews
            </Link>
          </div>
          <p className="ph-note">* Claims pending final approval.</p>
        </div>
      </section>
    </>
  );
}
