"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import BottleBlueprint from "../brand/BottleBlueprint";
import { HOW_STEPS } from "../../data/content";
import styles from "./HowItWorks.module.scss";

/*
  Pinned bottle + scrolling steps. Each step that crosses the viewport centre
  drives the bottle state: sealed → click → blend → apply.
*/
export default function HowItWorks({ shade, compact = false }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const state = active === 0 ? "sealed" : "clicked";

  return (
    <section className={`${styles.band} ${compact ? styles.compact : ""}`} style={{ "--hex": shade.hex, "--glow": shade.glow }} aria-labelledby="how-title" id="how">
      <div className={`container ${styles.grid}`}>
        <div className={styles.stickyCol}>
          <div className={styles.sticky}>
            <div className={styles.stage} data-step={active}>
              <span className={styles.halo} aria-hidden="true" />
              <div className={styles.bottle}>
                <BottleBlueprint tone="cream" hex={shade.glow} state={state} labels={false} title={`Technical drawing of the one-click bottle, ${state}`} />
              </div>
              <span className={styles.drops} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.clickBurst} aria-hidden="true" />
            </div>
            <ol className={styles.progress} aria-hidden="true">
              {HOW_STEPS.map((s, i) => (
                <li key={s.n} className={i <= active ? styles.on : ""}>
                  {s.title}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.steps}>
          <header className={styles.head}>
            <p className={`eyebrow ${styles.eyebrow}`}>How it works</p>
            <h2 id="how-title" className={styles.title}>
              Two chambers. <em>One click.</em> Zero mixing.
            </h2>
            <p className={styles.lede}>A German-engineered, dual-chamber bottle that keeps colour and developer apart until the moment you need them.</p>
          </header>

          {HOW_STEPS.map((s, i) => (
            <article key={s.n} ref={(el) => (refs.current[i] = el)} data-i={i} className={`${styles.step} ${i === active ? styles.stepOn : ""}`}>
              <span className={styles.n}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
              <p className={styles.detail}>{s.detail}</p>
            </article>
          ))}

          {!compact ? (
            <Link href="/how-it-works" className={styles.more}>
              See the bottle up close <PiArrowRight aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
