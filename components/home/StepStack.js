"use client";

/*
  Application guide as a pinned 3D slide stack — adapted from the Reshoot "four steps" study.
  Each slide sticks for one viewport; as the next one rises over it, it tips back
  (rotateX 40°, scale .7, a fixed ±5° twist) and fades — warm OneColor gradients instead of lilac.
  Pure sticky + scroll-linked transforms (no pinning library); static stack under reduced motion.
*/
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PiArrowRight, PiArrowDown } from "react-icons/pi";
import InViewVideo from "../ui/InViewVideo";
import FlashText from "../ui/FlashText";
import { IMG, VIDEO } from "../../data/media";
import styles from "./StepStack.module.scss";

const SLIDES = [
  {
    n: "01",
    head: ["Patch test, then ", "prep."],
    time: "48 h before · 5 min on the day",
    bullets: [
      ["Patch test first", "A pea-sized dab behind the ear, 48 hours ahead. Every time."],
      ["Start with dry hair", "Unwashed for a day is ideal. Cape and gloves on."],
    ],
    cards: [
      { img: IMG.gloveApply, cap: "Thicker nitrile gloves, in every box", wide: true },
      { img: IMG.brushing, chip: "Detangle" },
      { img: IMG.backHair },
    ],
    g: "g1",
    twist: -3.4,
  },
  {
    n: "02",
    head: ["Click, shake, ", "apply."],
    time: "10 minutes",
    bullets: [
      ["One click, 1:1", "Twist the collar until it clicks. Shake five times."],
      ["Roots first", "Part, press the nozzle along the roots, then comb through."],
    ],
    cards: [
      { video: VIDEO.application, cap: "The application, start to finish", wide: true },
      { img: IMG.combing, chip: "Section" },
      { img: IMG.sisters },
    ],
    g: "g2",
    twist: 4.1,
  },
  {
    n: "03",
    head: ["Rinse, seal, ", "glow."],
    time: "30 minutes to develop",
    bullets: [
      ["Leave 30 minutes", "Longer at stubborn temples. Then rinse until clear."],
      ["Seal with conditioner", "The colour-lock conditioner closes the cuticle for shine."],
    ],
    cards: [
      { img: IMG.longBrownBack, cap: "Rich, even colour, root to tip", wide: true },
      { img: IMG.hairWavyBrown, chip: "Shine" },
      { img: IMG.goldenLight },
    ],
    g: "g3",
    twist: 0,
  },
];

function Slide({ s, last, progress, range }) {
  const reduce = useReducedMotion();
  // this card tips back while the next card rises over it
  const rotateX = useTransform(progress, range, [0, 40]);
  const scale = useTransform(progress, range, [1, 0.7]);
  const rotateZ = useTransform(progress, range, [0, s.twist]);
  const opacity = useTransform(progress, [range[0] + (range[1] - range[0]) * 0.55, range[1]], [1, 0]);
  const animate = !reduce && !last;

  return (
    <div className={styles.slide}>
      <div className={styles.persp}>
        <motion.article className={`${styles.card} ${styles[s.g]}`} style={animate ? { rotateX, scale, rotateZ, opacity } : undefined}>
          <div className={styles.top}>
            <h3 className={styles.h}>
              {s.head[0]}
              <em>{s.head[1]}</em>
            </h3>
            <span className={styles.num} aria-hidden="true">
              {s.n}
            </span>
          </div>
          <p className={styles.time}>{s.time}</p>
          <div className={styles.info}>
            {s.bullets.map(([t, p]) => (
              <div key={t}>
                <p className={styles.tag}>{t}</p>
                <p className={styles.p}>{p}</p>
              </div>
            ))}
          </div>
          <div className={styles.row}>
            {s.cards.map((c, i) => (
              <div key={i} className={`${styles.pc} ${c.wide ? styles.wide : ""}`}>
                {c.video ? (
                  <InViewVideo src={c.video.src} poster={c.video.poster} label="Hair being brushed after colouring" />
                ) : (
                  <Image src={c.img.src} alt={c.img.alt} fill sizes={c.wide ? "(min-width: 900px) 40vw, 90vw" : "(min-width: 900px) 20vw, 45vw"} />
                )}
                {c.chip ? <span className={styles.chip}>{c.chip}</span> : null}
                {c.cap ? (
                  <span className={styles.cap}>
                    <span>{c.cap}</span>
                    {last ? <PiArrowDown aria-hidden="true" /> : <PiArrowRight aria-hidden="true" />}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}

export default function StepStack() {
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  const n = SLIDES.length;
  return (
    <section className={styles.wrap} aria-labelledby="apply-title">
      <div className={`container ${styles.intro}`}>
        <p className="eyebrow">Application guide</p>
        <FlashText as="h2" id="apply-title" className={styles.title}>
          Salon colour, <em>at your dressing table.</em>
        </FlashText>
        <p className={styles.lede}>
          Three steps and about 45 minutes, with no mixing bowl and no stained sink.{" "}
          <Link href="/how-it-works#open">How to open the box</Link>
        </p>
      </div>
      <div className={styles.stack} ref={stackRef}>
        {SLIDES.map((s, i) => (
          <Slide key={s.n} s={s} last={i === n - 1} progress={scrollYProgress} range={[i / (n - 1), Math.min(1, (i + 1) / (n - 1))]} />
        ))}
      </div>
      <p className={`container ph-note ${styles.ph}`}>Photography and clip are placeholders for the client&apos;s application shoot.</p>
    </section>
  );
}
