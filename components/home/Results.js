"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiArrowUpRight } from "react-icons/pi";
import ImageCompare from "../ui/ImageCompare";
import Stars from "../ui/Stars";
import Reveal from "../ui/Reveal";
import { RESULTS, RATING } from "../../data/content";
import { getProduct } from "../../data/products";
import styles from "./Results.module.scss";
import FlashText from "../ui/FlashText";

// "Before" frames are simulated from the same photo until real customer results arrive.
const SIM_GREY = "grayscale(0.9) brightness(1.18) contrast(0.92) sepia(0.12)";

export default function Results() {
  const [i, setI] = useState(0);
  const r = RESULTS[i];
  const shade = getProduct(r.shade);

  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="results-title" style={{ "--hex": shade.hex, "--glow": shade.glow }}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal>
            <p className="eyebrow">Real results</p>
            <FlashText as="h2" id="results-title" className={styles.title}>
              Proof is in <em>the parting.</em>
            </FlashText>
          </Reveal>

          <Reveal className={styles.score} delay={0.08}>
            <span className={`${styles.big} tnum`}>{RATING.average}</span>
            <span className={styles.scoreMeta}>
              <Stars value={RATING.average} size={16} />
              <span>
                <strong className="tnum">{RATING.count}</strong> reviews from verified buyers
              </span>
            </span>
          </Reveal>

          <Reveal delay={0.14}>
            <p className={styles.pickLabel}>Results across ages and hair types</p>
            <div className={styles.tabs} role="tablist" aria-label="Choose a result">
              {RESULTS.map((res, k) => {
                const sp = getProduct(res.shade);
                return (
                  <button
                    key={res.id}
                    type="button"
                    role="tab"
                    aria-selected={k === i}
                    className={`${styles.tab} ${k === i ? styles.tabOn : ""}`}
                    style={{ "--t-hex": sp.hex, "--t-glow": sp.glow }}
                    onClick={() => setI(k)}
                  >
                    <span className={styles.tabDot} aria-hidden="true" />
                    <span>
                      {res.age} · {res.hairType}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div key={r.id} className={styles.caption} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
              <p className={styles.note}>{r.note}</p>
              <Link href={`/products/${shade.slug}`} className={styles.shadeLink}>
                <span className={styles.tabDot} style={{ "--t-hex": shade.hex, "--t-glow": shade.glow }} aria-hidden="true" />
                {shade.code} {shade.name}
                <PiArrowUpRight aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal className={styles.visual} delay={0.1}>
          <div className={styles.frame}>
            <ImageCompare key={r.id} before={r.after} after={r.after} beforeFilter={SIM_GREY} beforeLabel="Before" afterLabel={`After · ${shade.code}`} />
          </div>
          <p className="ph-note">Simulated preview. Verified customer before/after photos will replace this at launch.</p>
        </Reveal>
      </div>
    </section>
  );
}
