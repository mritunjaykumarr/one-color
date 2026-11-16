"use client";

/*
  Before/after slider — ported from 21st.dev "Image Comparison" (ibelick / motion-primitives)
  to JSX + SCSS. Adds pointer capture (mouse + touch in one path), full keyboard control
  via a real range input, and labels. Driven by a spring so the divider glides.
*/
import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import styles from "./ImageCompare.module.scss";

export default function ImageCompare({ before, after, beforeLabel = "Before", afterLabel = "After", beforeFilter, sizes = "(min-width: 900px) 50vw, 100vw", preload = false }) {
  const ref = useRef(null);
  const dragging = useRef(false);
  const raw = useMotionValue(50);
  const pos = useSpring(raw, { stiffness: 380, damping: 40, mass: 0.6 });
  const clipBefore = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const inputRef = useRef(null);

  function setFromClientX(x) {
    const r = ref.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100));
    raw.set(pct);
    if (inputRef.current) inputRef.current.value = String(Math.round(pct));
  }

  return (
    <div
      ref={ref}
      className={styles.wrap}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={after.src} alt={after.alt} fill sizes={sizes} preload={preload} loading={preload ? "eager" : undefined} className={styles.img} draggable={false} />
      <motion.div className={styles.beforeLayer} style={{ clipPath: clipBefore }}>
        <Image src={before.src} alt={before.alt} fill sizes={sizes} className={styles.img} style={beforeFilter ? { filter: beforeFilter } : undefined} draggable={false} />
      </motion.div>

      <span className={`${styles.tag} ${styles.tagL}`}>{beforeLabel}</span>
      <span className={`${styles.tag} ${styles.tagR}`}>{afterLabel}</span>

      <motion.div className={styles.divider} style={{ left }} aria-hidden="true">
        <span className={styles.handle}>
          <PiCaretLeft />
          <PiCaretRight />
        </span>
      </motion.div>

      <input
        ref={inputRef}
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        className={styles.range}
        aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()}`}
        onChange={(e) => raw.set(Number(e.target.value))}
      />
    </div>
  );
}
