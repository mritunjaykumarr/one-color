"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiX, PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { useUI } from "./UIProvider";
import { getProduct } from "../../data/products";
import Image from "next/image";
import { SHADE_IMAGES } from "../../data/media";
import Price from "../ui/Price";
import styles from "./ShadeFinder.module.scss";

const STEPS = [
  {
    key: "base",
    q: "What's your hair colour today?",
    options: [
      { id: "black", label: "Black", swatch: "#1d1716" },
      { id: "dark", label: "Dark brown", swatch: "#3a241c" },
      { id: "medium", label: "Medium brown", swatch: "#6b4430" },
      { id: "grey", label: "Mostly grey", swatch: "#c9c3bd" },
    ],
  },
  {
    key: "goal",
    q: "What would you love?",
    options: [
      { id: "natural", label: "Natural, just no greys", note: "Looks like your own colour" },
      { id: "warm", label: "Richer and warmer", note: "A soft glow in sunlight" },
      { id: "bold", label: "Make a statement", note: "Wine and red tones" },
    ],
  },
  {
    key: "grey",
    q: "How much grey is there?",
    options: [
      { id: "few", label: "A few strands", note: "Mostly temples or parting" },
      { id: "half", label: "Up to half", note: "Noticeable all over" },
      { id: "most", label: "More than half", note: "We'll pick full coverage" },
    ],
  },
];

function recommend({ base, goal }) {
  if (goal === "bold") return base === "medium" || base === "grey" ? "mahogany" : "burgundy-wine";
  if (goal === "warm") return base === "black" ? "espresso-dark-brown" : "chestnut-brown";
  return { black: "natural-black", dark: "espresso-dark-brown", medium: "chestnut-brown", grey: "espresso-dark-brown" }[base] || "natural-black";
}

export default function ShadeFinder() {
  const { finderOpen, setFinderOpen } = useUI();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);

  const [wasOpen, setWasOpen] = useState(finderOpen);
  if (finderOpen !== wasOpen) {
    setWasOpen(finderOpen);
    if (finderOpen) {
      setStep(0);
      setAnswers({});
    }
  }

  useEffect(() => {
    if (!finderOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setFinderOpen(false);
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => dialogRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [finderOpen, setFinderOpen]);

  const done = step >= STEPS.length;
  const result = done ? getProduct(recommend(answers)) : null;
  const alt = done ? getProduct(answers.goal === "bold" ? "espresso-dark-brown" : answers.goal === "warm" ? "mahogany" : "chestnut-brown") : null;

  function pick(key, id) {
    setAnswers((a) => ({ ...a, [key]: id }));
    setStep((s) => s + 1);
  }

  return (
    <AnimatePresence>
      {finderOpen ? (
        <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && setFinderOpen(false)}>
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="finder-title"
            style={result ? { "--hex": result.hex, "--tint": result.tint, "--glow": result.glow } : undefined}
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.top}>
              {step > 0 && !done ? (
                <button type="button" className={styles.icon} onClick={() => setStep((s) => s - 1)} aria-label="Previous question">
                  <PiArrowLeft />
                </button>
              ) : (
                <span className={styles.kicker}>Shade finder</span>
              )}
              <div className={styles.dots} aria-hidden="true">
                {STEPS.map((s, i) => (
                  <span key={s.key} className={i < step ? styles.dotDone : i === step ? styles.dotNow : ""} />
                ))}
              </div>
              <button type="button" className={styles.icon} onClick={() => setFinderOpen(false)} aria-label="Close shade finder">
                <PiX />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {!done ? (
                <motion.div
                  key={step}
                  className={styles.step}
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={styles.count}>
                    Question {step + 1} of {STEPS.length}
                  </p>
                  <h2 id="finder-title" className={styles.q}>
                    {STEPS[step].q}
                  </h2>
                  <div className={`${styles.options} ${STEPS[step].key === "base" ? styles.grid4 : ""}`}>
                    {STEPS[step].options.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        className={`${styles.opt} ${answers[STEPS[step].key] === o.id ? styles.sel : ""}`}
                        onClick={() => pick(STEPS[step].key, o.id)}
                      >
                        {o.swatch ? <span className={styles.sw} style={{ background: o.swatch }} aria-hidden="true" /> : null}
                        <span className={styles.optLabel}>{o.label}</span>
                        {o.note ? <span className={styles.optNote}>{o.note}</span> : null}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  className={styles.result}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.resultArt}>
                    <Image src={SHADE_IMAGES[result.imageKey].portrait.src} alt={SHADE_IMAGES[result.imageKey].portrait.alt} fill sizes="260px" />
                    <span className={styles.resultSw} aria-hidden="true" />
                  </div>
                  <div className={styles.resultBody}>
                    <p className={styles.count}>Your match</p>
                    <h2 id="finder-title" className={styles.resultName}>
                      <span>{result.code}</span> {result.name}
                    </h2>
                    <p className={styles.why}>{result.bestFor}</p>
                    <Price price={result.price} mrp={result.mrp} />
                    <div className={styles.ctas}>
                      <Link href={`/products/${result.slug}`} className={styles.primary} onClick={() => setFinderOpen(false)}>
                        See {result.name} <PiArrowRight aria-hidden="true" />
                      </Link>
                      <Link href={`/products/${alt.slug}`} className={styles.secondary} onClick={() => setFinderOpen(false)}>
                        Or try {alt.name}
                      </Link>
                    </div>
                    <button type="button" className={styles.restart} onClick={() => { setStep(0); setAnswers({}); }}>
                      Start again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
