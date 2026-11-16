"use client";

import Link from "next/link";
import Image from "next/image";
import { SHADE_IMAGES } from "../../data/media";
import { PiPlusBold, PiBellSimple, PiCheckBold } from "react-icons/pi";
import { useState } from "react";
import ProductArt from "./ProductArt";
import Stars from "../ui/Stars";
import Price from "../ui/Price";
import { useCart } from "../cart/CartProvider";
import styles from "./ProductCard.module.scss";

export default function ProductCard({ product }) {
  const p = product;
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const soon = p.status === "coming-soon";
  const isShade = p.category === "hair-colour";

  function onAdd() {
    if (p.choosesShade) return; // kits need a shade picked on the product page
    add(p.slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className={`${styles.card} ${soon ? styles.soon : ""}`} style={{ "--tint": p.tint, "--hex": p.hex, "--glow": p.glow }}>
      <Link href={`/products/${p.slug}`} className={styles.media} aria-label={`${p.title}, view details`}>
        {isShade ? (
          <>
            <Image src={SHADE_IMAGES[p.imageKey].portrait.src} alt="" fill sizes="(min-width: 900px) 25vw, 46vw" className={`${styles.photo} ${soon ? styles.photoSoon : ""}`} />
            <span className={styles.photoVeil} aria-hidden="true" />
            <span className={styles.swatchChip} aria-hidden="true">
              <span />
              {p.code}
            </span>
          </>
        ) : (
          <>
            <span className={styles.halo} aria-hidden="true" />
            <span className={styles.art}>
              <ProductArt product={p} state={soon ? "sealed" : "clicked"} />
            </span>
          </>
        )}
        {p.badge || soon ? <span className={styles.badge}>{soon ? "Coming soon" : p.badge}</span> : null}
        {!soon && p.discount ? <span className={styles.off}>−{p.discount}%</span> : null}
      </Link>

      <div className={styles.body}>
        <div className={styles.meta}>
          {isShade ? <span className={styles.cat}>{p.tone} tone</span> : <span className={styles.cat}>{p.size}</span>}
          {p.reviews > 0 ? (
            <span className={styles.rating}>
              <Stars value={p.rating} size={12} />
              <span className="tnum">
                {p.rating} <span className={styles.count}>({p.reviews})</span>
              </span>
            </span>
          ) : null}
        </div>

        <h3 className={styles.title}>
          <Link href={`/products/${p.slug}`}>{isShade ? p.name : p.title}</Link>
        </h3>
        <p className={styles.tagline}>{p.tagline}</p>

        <div className={styles.foot}>
          <Price price={p.price} mrp={p.mrp} size="sm" />
          {soon ? (
            <Link href={`/products/${p.slug}#notify`} className={styles.iconBtn} aria-label={`Get notified when ${p.title} launches`}>
              <PiBellSimple />
            </Link>
          ) : p.choosesShade ? (
            <Link href={`/products/${p.slug}`} className={styles.textBtn}>
              Choose shade
            </Link>
          ) : (
            <button type="button" className={`${styles.iconBtn} ${added ? styles.done : ""}`} onClick={onAdd} aria-label={`Add ${p.title} to bag`}>
              {added ? <PiCheckBold /> : <PiPlusBold />}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
