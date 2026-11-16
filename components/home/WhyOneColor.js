"use client";

import { useState } from "react";
import { PiCheckBold, PiMinusBold } from "react-icons/pi";
import Reveal from "../ui/Reveal";
import { COMPARE } from "../../data/content";
import styles from "./WhyOneColor.module.scss";
import FlashText from "../ui/FlashText";

export default function WhyOneColor() {
  const [vs, setVs] = useState(1); // mobile: OneColor vs (1 = box dye, 2 = salon)

  return (
    <section className={styles.band} aria-labelledby="why-title">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.head}>
          <p className={`eyebrow ${styles.eyebrow}`}>Why OneColor</p>
          <FlashText as="h2" id="why-title" className={styles.title}>
            Less mess than a box. <em>Less money than a salon.</em>
          </FlashText>
        </Reveal>

        <div className={styles.toggle} role="tablist" aria-label="Compare OneColor with">
          {COMPARE.columns.slice(1).map((c, k) => (
            <button key={c} type="button" role="tab" aria-selected={vs === k + 1} className={vs === k + 1 ? styles.tOn : ""} onClick={() => setVs(k + 1)}>
              vs {c}
            </button>
          ))}
        </div>

        <Reveal delay={0.08}>
          <table className={styles.table} data-vs={vs}>
            <caption className="sr-only">OneColor compared with box dye and salon colouring</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Factor</span>
                </th>
                {COMPARE.columns.map((c, k) => (
                  <th key={c} scope="col" className={k === 0 ? styles.us : styles[`c${k}`]}>
                    {k === 0 ? <span className={styles.usHead}>{c}</span> : c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.values.map((v, k) => {
                    const win = r.wins.includes(k);
                    return (
                      <td key={k} className={k === 0 ? styles.us : styles[`c${k}`]}>
                        <span className={`${styles.mark} ${win ? styles.win : ""}`} aria-hidden="true">
                          {win ? <PiCheckBold /> : <PiMinusBold />}
                        </span>
                        <span>{v}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className={styles.foot}>* Reuse and cost-per-use depend on hair length; claims pending final approval.</p>
      </div>
    </section>
  );
}
