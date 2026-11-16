"use client";

/*
  Brand manifesto — a masked column of phrases that crawls upward forever and brightens as each
  phrase rises (adapted from the Reshoot "how it works" crawl: opacity = .2 + .8·p, fadeFinish .15).
  The brightness loop only runs while the section is on screen.
*/
import { useEffect, useRef } from "react";
import FlashText from "../ui/FlashText";
import styles from "./Manifesto.module.scss";

const PHRASES = [
  { t: "No bowls." },
  { t: "No brushes." },
  { t: "No guesswork." },
  { t: "No waste.*" },
  { t: "Just ", it: "your colour." },
];

export default function Manifesto() {
  const winRef = useRef(null);

  useEffect(() => {
    const win = winRef.current;
    if (!win) return undefined;
    const items = [...win.querySelectorAll("[data-phrase]")];
    let raf = 0;
    let on = false;
    const FADE_FINISH = 0.15;
    const tick = () => {
      raf = 0;
      if (!on) return;
      const wr = win.getBoundingClientRect();
      const H = wr.height;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const top = r.top - wr.top;
        const bottom = top + r.height;
        let o = 0.2;
        if (bottom > 0 && top < H) {
          const n = Math.min(1, Math.max(0, 1 - bottom / H));
          const p = Math.min(1, Math.max(0, n / (1 - FADE_FINISH)));
          o = 0.2 + 0.8 * p;
        }
        el.style.opacity = o.toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(win);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const column = (dup) => (
    <div className={styles.col} aria-hidden={dup ? true : undefined}>
      {PHRASES.map((p) => (
        <p key={p.t} className={styles.phrase} data-phrase>
          {p.t}
          {p.it ? <em>{p.it}</em> : null}
        </p>
      ))}
    </div>
  );

  return (
    <section className={styles.wrap} aria-labelledby="manifesto-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.lead}>
          <p className="eyebrow">The OneColor idea</p>
          <FlashText as="h2" id="manifesto-title" className={styles.title}>
            Colour, <em>minus</em> the chaos.
          </FlashText>
          <p className={styles.body}>Two chambers keep colour and developer apart until you click. Everything that used to make home colour messy simply isn&apos;t there any more.</p>
        </div>
        <div className={styles.window} ref={winRef}>
          {column(false)}
          {column(true)}
        </div>
      </div>
    </section>
  );
}
