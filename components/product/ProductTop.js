"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProductGallery from "./ProductGallery";
import BuyBox from "./BuyBox";
import { useCart } from "../cart/CartProvider";
import { inr } from "../../lib/format";
import styles from "./ProductTop.module.scss";

/* Above-the-fold product block + the mobile sticky add-to-cart bar (appears once the main CTA scrolls away). */
export default function ProductTop({ product, shades, slides }) {
  const p = product;
  const atcRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  const { add } = useCart();
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = atcRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section className={`container ${styles.top}`} aria-label={`${p.title} details`}>
        <ProductGallery product={p} slides={slides} />
        <BuyBox product={p} shades={shades} atcRef={atcRef} />
      </section>

      <AnimatePresence>
        {stuck && p.status === "in-stock" ? (
          <motion.div
            className={styles.sticky}
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "110%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-label="Quick add to bag"
          >
            <span className={styles.sDot} style={{ background: `radial-gradient(circle at 35% 30%, ${p.glow}, ${p.hex} 72%)` }} aria-hidden="true" />
            <span className={styles.sInfo}>
              <span className={styles.sName}>{p.category === "hair-colour" ? `${p.code} ${p.name}` : p.title}</span>
              <span className={styles.sPrice}>
                <strong className="tnum">{inr(p.price)}</strong> <s className="tnum">{inr(p.mrp)}</s>
              </span>
            </span>
            <button type="button" className={styles.sBtn} onClick={() => add(p.slug, { shade: p.choosesShade ? shades[0].slug : null })}>
              Add to bag
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
