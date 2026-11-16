import { inr } from "../../lib/format";
import styles from "./Price.module.scss";

export default function Price({ price, mrp, size = "md", showSave = true }) {
  const save = mrp - price;
  const pct = Math.round((save / mrp) * 100);
  return (
    <span className={`${styles.price} ${styles[size]}`}>
      <span className={`${styles.now} tnum`}>{inr(price)}</span>
      {mrp > price ? (
        <>
          <s className={`${styles.mrp} tnum`}>
            <span className="sr-only">MRP </span>
            {inr(mrp)}
          </s>
          {showSave ? <span className={styles.save}>{pct}% off</span> : null}
        </>
      ) : null}
    </span>
  );
}
