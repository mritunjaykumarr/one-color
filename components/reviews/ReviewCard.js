import Image from "next/image";
import Link from "next/link";
import { PiSealCheckFill } from "react-icons/pi";
import Stars from "../ui/Stars";
import { getProduct } from "../../data/products";
import styles from "./ReviewCard.module.scss";

export default function ReviewCard({ review, showPhoto = true, compact = false }) {
  const r = review;
  const shade = getProduct(r.shade);
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ""}`}>
      {showPhoto && r.photo ? (
        <div className={styles.photo}>
          <Image src={r.photo.src} alt={`${r.name}, ${r.age}, after colouring with ${shade?.name}`} fill sizes="(min-width: 900px) 22vw, 70vw" />
        </div>
      ) : null}
      <div className={styles.body}>
        <Stars value={r.rating} size={13} />
        <h3 className={styles.title}>{r.title}</h3>
        <p className={styles.text}>{r.body}</p>
        <div className={styles.meta}>
          <span className={styles.who}>
            {r.name} · {r.age} · {r.city}
            {r.verified ? (
              <span className={styles.verified}>
                <PiSealCheckFill aria-hidden="true" /> Verified buyer
              </span>
            ) : null}
          </span>
          {shade ? (
            <Link href={`/products/${shade.slug}`} className={styles.shade} style={{ "--hex": shade.hex, "--glow": shade.glow }}>
              <span aria-hidden="true" />
              {shade.code} {shade.name}
            </Link>
          ) : null}
          <span className={styles.type}>{r.hairType} hair</span>
        </div>
      </div>
    </article>
  );
}
