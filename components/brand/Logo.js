import styles from "./Logo.module.scss";

/*
  PLACEHOLDER wordmark until the client supplies the OneColor logo.
  The "O" is a bisected circle: two halves (cream + colour) that become one.
*/
export default function Logo({ className = "", tone = "ink" }) {
  return (
    <span className={`${styles.logo} ${styles[tone]} ${className}`} aria-label="OneColor">
      <svg viewBox="0 0 32 32" className={styles.mark} aria-hidden="true">
        <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 3.2 A12.8 12.8 0 0 0 16 28.8 Z" fill="var(--accent)" />
        <path d="M16 3.2 A12.8 12.8 0 0 1 16 28.8 Z" fill="currentColor" opacity="0.08" />
      </svg>
      <span className={styles.word} aria-hidden="true">
        ne<em>Color</em>
      </span>
    </span>
  );
}
