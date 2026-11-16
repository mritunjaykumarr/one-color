"use client";

import { useId, useState } from "react";
import styles from "./Accordion.module.scss";

/* One-open-at-a-time accordion; body animates grid-template-rows 0fr → 1fr (no height jank). */
export default function Accordion({ items, defaultOpen = 0, tone = "light" }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();

  return (
    <div className={`${styles.acc} ${styles[tone]}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const hid = `${base}-h${i}`;
        const pid = `${base}-p${i}`;
        return (
          <div key={it.q} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
            <h3 className={styles.h}>
              <button
                id={hid}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{it.q}</span>
                <span className={styles.plus} aria-hidden="true" />
              </button>
            </h3>
            <div id={pid} role="region" aria-labelledby={hid} className={styles.panel}>
              <div className={styles.inner}>
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
