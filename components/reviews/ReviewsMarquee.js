import ReviewCard from "./ReviewCard";
import styles from "./ReviewsMarquee.module.scss";

/*
  Vertical kinetic review wall — ported from 21st.dev "Testimonials Vertical Marquee"
  (scrollxui) to pure CSS: columns drift in alternating directions, pause on hover/focus,
  fade at the edges, and fall back to a static stack under reduced motion.
*/
export default function ReviewsMarquee({ reviews, columns = 3 }) {
  const cols = Array.from({ length: columns }, (_, c) => reviews.filter((_, i) => i % columns === c));
  return (
    <div className={styles.wall} style={{ "--cols": columns }}>
      {cols.map((col, c) => (
        <div key={c} className={`${styles.col} ${c % 2 ? styles.down : styles.up} ${c > 0 ? styles.extra : ""}`} style={{ "--dur": `${38 + c * 7}s` }}>
          <div className={styles.track}>
            {[0, 1].map((dup) => (
              <div key={dup} className={styles.group} aria-hidden={dup === 1 ? true : undefined} inert={dup === 1 ? true : undefined}>
                {col.map((r, k) => (
                  <ReviewCard key={`${r.id}-${dup}`} review={r} showPhoto={(k + c) % 2 === 0} compact />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
