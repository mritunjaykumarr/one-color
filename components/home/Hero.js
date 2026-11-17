"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PiArrowRight } from "react-icons/pi";
import BottleBlueprint from "../brand/BottleBlueprint";
import Stars from "../ui/Stars";
import { useUI } from "../layout/UIProvider";
import { IMG, SHADE_IMAGES } from "../../data/media";
import { RATING } from "../../data/content";
import styles from "./Hero.module.scss";

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ shades }) {
  const { setFinderOpen } = useUI();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(4); // Burgundy Wine leads — the most "vibrant" shade
  const [clicked, setClicked] = useState(Boolean(reduce));
  const shade = shades[active];

  // The signature moment: bottle arrives sealed, then clicks and blends.
  useEffect(() => {
    if (reduce) return undefined;
    const t = window.setTimeout(() => setClicked(true), 1100);
    return () => window.clearTimeout(t);
  }, [reduce]);

  function choose(i) {
    if (i === active) return;
    setActive(i);
    if (reduce) return;
    setClicked(false);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setClicked(true)));
  }

  const line = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 34 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section className={styles.hero} style={{ "--hex": shade.hex, "--glow": shade.glow, "--tint": shade.tint }} aria-labelledby="hero-title">
      <div className={styles.wash} aria-hidden="true" />
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <motion.p className="eyebrow" {...line(0.05)}>
            Permanent hair colour · Made for Indian hair
          </motion.p>
          <h1 id="hero-title" className={styles.title}>
            <motion.span className={styles.l1} {...line(0.12)}>
              One click.
            </motion.span>
            <motion.span className={styles.l2} {...line(0.2)}>
              Your <em>colour.</em>
            </motion.span>
          </h1>
          <motion.p className={styles.lede} {...line(0.3)}>
            Colour cream and developer live in two chambers of one bottle. Click, and they mix 1:1 inside. No bowls, no brushes, no guesswork, and nothing goes to waste.
          </motion.p>

          <motion.div className={styles.ctas} {...line(0.38)}>
            <button type="button" className={styles.primary} onClick={() => setFinderOpen(true)}>
              Find your shade <PiArrowRight aria-hidden="true" />
            </button>
            <Link href="/shop" className={styles.secondary}>
              Shop all
            </Link>
          </motion.div>

          <motion.div className={styles.picker} {...line(0.46)}>
            <div className={styles.pickerHead}>
              <span className={styles.pickerLabel}>Try a shade</span>
              <Link href={`/products/${shade.slug}`} className={styles.pickerName}>
                {shade.code} {shade.name} <PiArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.swatches} role="radiogroup" aria-label="Preview shade">
              {shades.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  role="radio"
                  aria-checked={i === active}
                  aria-label={`${s.code} ${s.name}`}
                  className={`${styles.sw} ${i === active ? styles.swOn : ""}`}
                  style={{ "--s-hex": s.hex, "--s-glow": s.glow }}
                  onClick={() => choose(i)}
                  onMouseEnter={() => choose(i)}
                />
              ))}
            </div>
          </motion.div>

          <motion.a href="#reviews" className={styles.proof} {...line(0.54)}>
            <Stars value={RATING.average} size={13} />
            <span className="tnum">
              <strong>{RATING.average}</strong> from {RATING.count} reviews
            </span>
          </motion.a>
        </div>

        <div className={styles.visual}>
          <motion.div
            className={styles.sun}
            aria-hidden="true"
            initial={reduce ? false : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <span className={styles.ring} aria-hidden="true" />
          <motion.div
            className={styles.arch}
            initial={reduce ? false : { clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)" }}
            animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)" }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
          >
            <Image
              key={shade.imageKey}
              src={(SHADE_IMAGES[shade.imageKey]?.portrait || IMG.heroWoman).src}
              alt={(SHADE_IMAGES[shade.imageKey]?.portrait || IMG.heroWoman).alt}
              fill
              preload
              loading="eager"
              sizes="(min-width: 900px) 46vw, 88vw"
              className={styles.photo}
            />
          </motion.div>

          <motion.div
            className={styles.bottle}
            initial={reduce ? false : { y: 60, opacity: 0, rotate: -8 }}
            animate={{ y: 0, opacity: 1, rotate: -6 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
          >
            <span className={styles.disc}>
              <BottleBlueprint hex={shade.hex} state={clicked ? "clicked" : "sealed"} labels={false} />
              <span className={styles.discCap}>Fig. 1 · Dual chamber, 1:1</span>
            </span>
          </motion.div>
          <p className={`ph-note ${styles.phNote}`}>Product drawing: placeholder · Photography: OneColor collection</p>
        </div>
      </div>
    </section>
  );
}
