"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiSealCheck, PiX, PiQuotes } from "react-icons/pi";
import ReviewCard from "./ReviewCard";
import { REVIEWS, HAIR_TYPES, FOUNDER_NOTE } from "../../data/content";
import { LAUNCH_SHADES } from "../../data/products";
import styles from "./ReviewsExplorer.module.scss";

const SORTS = [
  { id: "recent", label: "Most recent" },
  { id: "helpful", label: "Most helpful" },
  { id: "photos", label: "With photos" },
];

export default function ReviewsExplorer() {
  const [shade, setShade] = useState("all");
  const [hair, setHair] = useState("all");
  const [verified, setVerified] = useState(false);
  const [sort, setSort] = useState("recent");
  const reduce = useReducedMotion();

  const list = useMemo(() => {
    let out = REVIEWS.filter((r) => (shade === "all" || r.shade === shade) && (hair === "all" || r.hairType === hair) && (!verified || r.verified));
    if (sort === "helpful") out = [...out].sort((a, b) => b.helpful - a.helpful);
    else if (sort === "photos") out = [...out].sort((a, b) => Boolean(b.photo) - Boolean(a.photo));
    else out = [...out].sort((a, b) => b.date.localeCompare(a.date));
    return out;
  }, [shade, hair, verified, sort]);

  const filtered = shade !== "all" || hair !== "all" || verified;
  const reset = () => {
    setShade("all");
    setHair("all");
    setVerified(false);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <div className={styles.group}>
          <span className={styles.label} id="rf-shade">
            Shade
          </span>
          <div className={styles.swatches} role="radiogroup" aria-labelledby="rf-shade">
            <button type="button" role="radio" aria-checked={shade === "all"} className={`${styles.allBtn} ${shade === "all" ? styles.on : ""}`} onClick={() => setShade("all")}>
              All
            </button>
            {LAUNCH_SHADES.map((s) => (
              <button
                key={s.slug}
                type="button"
                role="radio"
                aria-checked={shade === s.slug}
                aria-label={`${s.code} ${s.name}`}
                title={s.name}
                className={`${styles.sw} ${shade === s.slug ? styles.swOn : ""}`}
                style={{ "--hex": s.hex, "--glow": s.glow }}
                onClick={() => setShade(s.slug)}
              />
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="rf-hair">
            Hair type
          </label>
          <select id="rf-hair" className={styles.select} value={hair} onChange={(e) => setHair(e.target.value)}>
            <option value="all">All hair types</option>
            {HAIR_TYPES.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <label className={styles.toggle}>
          <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
          <span className={styles.switch} aria-hidden="true" />
          <PiSealCheck aria-hidden="true" /> Verified buyers only
        </label>

        <div className={`${styles.group} ${styles.sortGroup}`}>
          <label className={styles.label} htmlFor="rf-sort">
            Sort
          </label>
          <select id="rf-sort" className={styles.select} value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.status} aria-live="polite">
        <span>
          Showing <strong className="tnum">{list.length}</strong> {list.length === 1 ? "review" : "reviews"}
        </span>
        {filtered ? (
          <button type="button" className={styles.clear} onClick={reset}>
            <PiX aria-hidden="true" /> Clear filters
          </button>
        ) : null}
      </div>

      <motion.div layout={!reduce} className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {list.map((r) => (
            <motion.div
              key={r.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={styles.cell}
            >
              <ReviewCard review={r} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length < 2 ? (
        <div className={styles.low}>
          <PiQuotes className={styles.quoteIcon} aria-hidden="true" />
          <div>
            <p className={styles.lowKicker}>{list.length === 0 ? "No reviews for this combination yet" : "Only a few reviews here so far"}</p>
            <blockquote className={styles.quote}>&ldquo;{FOUNDER_NOTE.quote}&rdquo;</blockquote>
            <p className={styles.by}>
              {FOUNDER_NOTE.name}, {FOUNDER_NOTE.role}
            </p>
            <div className={styles.lowActions}>
              <a href="#results" className={styles.lowBtn}>
                See the results gallery
              </a>
              {filtered ? (
                <button type="button" className={styles.lowLink} onClick={reset}>
                  Show all reviews
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
