"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PiPlayFill, PiPauseFill } from "react-icons/pi";
import styles from "./InViewVideo.module.scss";

/* Muted, lazy video: loads nothing until near the viewport, plays only while visible, user can pause. */
export default function InViewVideo({ src, poster, label, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [manual, setManual] = useState(null); // null | "play" | "pause"
  const paused = manual ? manual === "pause" : Boolean(reduce);
  const userPaused = useRef(false);

  useEffect(() => {
    userPaused.current = paused;
    const v = ref.current;
    if (v && paused && !v.paused) v.pause();
  }, [paused]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          if (!userPaused.current) v.play().catch(() => setManual("pause"));
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = ref.current;
    if (v.paused) {
      v.play().catch(() => {});
      setManual("play");
    } else {
      v.pause();
      setManual("pause");
    }
  }

  return (
    <div className={`${styles.wrap} ${className}`}>
      <video ref={ref} className={styles.video} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />
      <button type="button" className={styles.btn} onClick={toggle} aria-label={paused ? "Play video" : "Pause video"}>
        {paused ? <PiPlayFill /> : <PiPauseFill />}
      </button>
    </div>
  );
}
