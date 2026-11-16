"use client";

import { useState } from "react";
import { inr } from "../../lib/format";
import styles from "./PriceRange.module.scss";

/* Dual-thumb price slider: two native range inputs (keyboard + a11y for free), committed on release. */
export default function PriceRange({ min, max, floor, ceil, step = 50, onCommit }) {
  const [lo, setLo] = useState(min);
  const [hi, setHi] = useState(max);

  const [src, setSrc] = useState(`${min}-${max}`);
  if (src !== `${min}-${max}`) {
    setSrc(`${min}-${max}`);
    setLo(min);
    setHi(max);
  }

  const pct = (v) => ((v - floor) / (ceil - floor)) * 100;
  const commit = () => onCommit(Math.min(lo, hi), Math.max(lo, hi));

  return (
    <div className={styles.wrap}>
      <div className={styles.values}>
        <span className="tnum">{inr(lo)}</span>
        <span className={styles.dash} aria-hidden="true" />
        <span className="tnum">{hi >= ceil ? `${inr(ceil)}+` : inr(hi)}</span>
      </div>
      <div className={styles.slider} style={{ "--a": `${pct(lo)}%`, "--b": `${pct(hi)}%` }}>
        <span className={styles.track} aria-hidden="true" />
        <input
          type="range"
          min={floor}
          max={ceil}
          step={step}
          value={lo}
          aria-label="Minimum price"
          aria-valuetext={inr(lo)}
          onChange={(e) => setLo(Math.min(Number(e.target.value), hi - step))}
          onPointerUp={commit}
          onKeyUp={commit}
          onBlur={commit}
        />
        <input
          type="range"
          min={floor}
          max={ceil}
          step={step}
          value={hi}
          aria-label="Maximum price"
          aria-valuetext={inr(hi)}
          onChange={(e) => setHi(Math.max(Number(e.target.value), lo + step))}
          onPointerUp={commit}
          onKeyUp={commit}
          onBlur={commit}
        />
      </div>
    </div>
  );
}
