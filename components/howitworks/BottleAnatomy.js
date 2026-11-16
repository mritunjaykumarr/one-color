"use client";

import { useState } from "react";
import BottleBlueprint from "../brand/BottleBlueprint";
import styles from "./BottleAnatomy.module.scss";

/*
  Interactive bottle anatomy over the fine-line BottleBlueprint drawing. Hotspot pattern adapted from MotionSites "Spin Product":
  pulsing "+" pins, callouts that wipe open with clip-path on hover / focus / tap.
  On small screens the callouts become a numbered legend synced to the active pin.
*/
const SPOTS = [
  { id: "nozzle", x: 33.3, y: 5.5, side: "right", title: "Precision nozzle", body: "Lays colour straight onto the roots. No brush, no bowl, no drips down your neck." },
  { id: "collar", x: 71.4, y: 19.6, side: "left", title: "Click collar", body: "Twist until you feel the click. That's the only 'mixing' you'll ever do." },
  { id: "cream", x: 15.2, y: 44.7, side: "right", title: "Chamber A: colour cream", body: "The pigment, in a rich cream that clings to every strand, including stubborn temple greys." },
  { id: "seal", x: 28.6, y: 74.9, side: "right", title: "1:1 seal", body: "Keeps both chambers apart until the click, then opens to release them in an exact 1:1 ratio." },
  { id: "dev", x: 81, y: 79.1, side: "left", title: "Chamber B: developer", body: "The activator. Pre-measured so the result is the same every time, from the first use to the last." },
];

export default function BottleAnatomy({ shade }) {
  const [active, setActive] = useState(null);
  const [clicked, setClicked] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <span className={styles.ring} aria-hidden="true" />
        <div className={styles.bottle}>
          <BottleBlueprint tone="ink" hex={shade.hex} labels={false} state={clicked ? "clicked" : "sealed"} />
          {SPOTS.map((s, i) => {
            const on = active === s.id;
            return (
              <div key={s.id} className={`${styles.spot} ${on ? styles.on : ""} ${clicked ? styles.dim : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                <button
                  type="button"
                  className={styles.pin}
                  aria-expanded={on}
                  aria-controls={`spot-${s.id}`}
                  aria-label={`${i + 1}. ${s.title}`}
                  onClick={() => setActive(on ? null : s.id)}
                  onMouseEnter={() => setActive(s.id)}
                  onMouseLeave={() => setActive((a) => (a === s.id ? null : a))}
                  onFocus={() => setActive(s.id)}
                >
                  <span aria-hidden="true">{i + 1}</span>
                </button>
                <div id={`spot-${s.id}`} role="note" className={`${styles.tip} ${styles[s.side]}`}>
                  <strong>{s.title}</strong>
                  <span>{s.body}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" className={`${styles.clickBtn} ${clicked ? styles.clickOn : ""}`} onClick={() => setClicked((c) => !c)} aria-pressed={clicked}>
          <span className={styles.clickDot} aria-hidden="true" />
          {clicked ? "Clicked: blended 1:1" : "Click it"}
        </button>
        <p className={styles.hint}>{clicked ? "Tap again to see the two chambers." : "Tap the pins, then click the bottle."}</p>
      </div>

      <ol className={styles.legend}>
        {SPOTS.map((s, i) => (
          <li key={s.id} className={active === s.id ? styles.legendOn : ""}>
            <button type="button" onClick={() => setActive(active === s.id ? null : s.id)}>
              <span className={styles.num}>{i + 1}</span>
              <span>
                <strong>{s.title}</strong>
                <span className={styles.legendBody}>{s.body}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
