import styles from "./Stars.module.scss";

export default function Stars({ value = 5, size = 14, label = true }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span
      className={styles.stars}
      style={{ "--size": `${size}px`, "--pct": `${pct}%` }}
      role={label ? "img" : undefined}
      aria-label={label ? `Rated ${value} out of 5` : undefined}
      aria-hidden={label ? undefined : true}
    >
      <span className={styles.track}>★★★★★</span>
      <span className={styles.fill}>★★★★★</span>
    </span>
  );
}
