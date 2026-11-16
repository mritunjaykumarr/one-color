import styles from "./ShopSkeleton.module.scss";

export default function ShopSkeleton() {
  return (
    <div className={`container ${styles.wrap}`} aria-busy="true" aria-label="Loading products">
      <div className={styles.title} />
      <div className={styles.search} />
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.card} />
        ))}
      </div>
    </div>
  );
}
