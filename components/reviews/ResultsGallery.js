import Link from "next/link";
import { PiArrowUpRight } from "react-icons/pi";
import ImageCompare from "../ui/ImageCompare";
import { RESULTS } from "../../data/content";
import { getProduct } from "../../data/products";
import styles from "./ResultsGallery.module.scss";

// Same simulated "before" as the home Results section until verified customer photos arrive.
const SIM_GREY = "grayscale(0.9) brightness(1.18) contrast(0.92) sepia(0.12)";

export default function ResultsGallery({ items = RESULTS }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {items.map((r) => {
          const shade = getProduct(r.shade);
          return (
            <figure key={r.id} className={styles.item} style={{ "--hex": shade.hex, "--glow": shade.glow }}>
              <div className={styles.frame}>
                <ImageCompare before={r.after} after={r.after} beforeFilter={SIM_GREY} beforeLabel="Before" afterLabel="After" sizes="(min-width: 900px) 33vw, 90vw" />
              </div>
              <figcaption className={styles.cap}>
                <span className={styles.meta}>
                  Age {r.age} · {r.hairType} hair
                </span>
                <span className={styles.note}>{r.note}</span>
                <Link href={`/products/${shade.slug}`} className={styles.shade}>
                  <span className={styles.dot} aria-hidden="true" />
                  {shade.code} {shade.name}
                  <PiArrowUpRight aria-hidden="true" />
                </Link>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <p className="ph-note">Simulated previews. Verified customer before/after photos will replace these at launch.</p>
    </div>
  );
}
