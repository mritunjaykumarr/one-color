"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiX, PiMinus, PiPlus, PiTruck, PiLockSimple, PiTrash } from "react-icons/pi";
import { useCart } from "./CartProvider";
import ProductArt from "../product/ProductArt";
import Button from "../ui/Button";
import { inr } from "../../lib/format";
import { SITE } from "../../data/content";
import { getProduct } from "../../data/products";
import styles from "./CartDrawer.module.scss";

const EASE = [0.16, 1, 0.3, 1];

export default function CartDrawer() {
  const { open, setOpen, lines, subtotal, mrpTotal, count, setQty, remove, add } = useCart();
  const reduce = useReducedMotion();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const remaining = Math.max(0, SITE.freeShipping - subtotal);
  const progress = Math.min(100, (subtotal / SITE.freeShipping) * 100);
  const savings = mrpTotal - subtotal;
  const hasGloves = lines.some((l) => l.slug === "nitrile-gloves");
  const upsell = getProduct(hasGloves ? "colour-lock-conditioner" : "nitrile-gloves");

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div className={styles.scrim} onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className={styles.top}>
              <h2 className={styles.title}>
                Your bag <span className="tnum">({count})</span>
              </h2>
              <button ref={closeRef} type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close bag">
                <PiX />
              </button>
            </div>

            <div className={styles.ship}>
              <p>
                <PiTruck aria-hidden="true" />
                {remaining > 0 ? (
                  <>
                    You&apos;re <strong className="tnum">{inr(remaining)}</strong> away from free delivery
                  </>
                ) : (
                  <>Free delivery unlocked</>
                )}
              </p>
              <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Free delivery progress">
                <span style={{ transform: `scaleX(${progress / 100})` }} />
              </div>
            </div>

            {lines.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyArt} aria-hidden="true">
                  <span />
                  <span />
                </div>
                <p className={styles.emptyTitle}>Your bag is waiting for its colour.</p>
                <p className={styles.emptyText}>Five shades, one click. Start with the one closest to your natural hair.</p>
                <Button href="/shop?category=hair-colour" onClick={() => setOpen(false)}>
                  Browse shades
                </Button>
              </div>
            ) : (
              <>
                <ul className={styles.lines}>
                  {lines.map((l) => (
                    <li key={l.key} className={styles.line}>
                      <Link href={`/products/${l.slug}`} className={styles.thumb} style={{ "--tint": l.product.tint }} onClick={() => setOpen(false)}>
                        <ProductArt product={l.product} />
                      </Link>
                      <div className={styles.info}>
                        <Link href={`/products/${l.slug}`} className={styles.name} onClick={() => setOpen(false)}>
                          {l.product.title}
                        </Link>
                        <span className={styles.variant}>{l.shadeProduct ? `Shade: ${l.shadeProduct.code} ${l.shadeProduct.name}` : l.product.size}</span>
                        <div className={styles.lineFoot}>
                          <div className={styles.qty}>
                            <button type="button" onClick={() => setQty(l.key, l.qty - 1)} aria-label={`Decrease quantity of ${l.product.title}`}>
                              <PiMinus />
                            </button>
                            <span className="tnum" aria-live="polite">
                              {l.qty}
                            </span>
                            <button type="button" onClick={() => setQty(l.key, l.qty + 1)} aria-label={`Increase quantity of ${l.product.title}`} disabled={l.qty >= 10}>
                              <PiPlus />
                            </button>
                          </div>
                          <span className={styles.lineTotal}>
                            <span className="tnum">{inr(l.lineTotal)}</span>
                            <s className="tnum">{inr(l.lineMrp)}</s>
                          </span>
                        </div>
                      </div>
                      <button type="button" className={styles.remove} onClick={() => remove(l.key)} aria-label={`Remove ${l.product.title}`}>
                        <PiTrash />
                      </button>
                    </li>
                  ))}
                </ul>

                {upsell ? (
                  <div className={styles.upsell}>
                    <div className={styles.upThumb} style={{ "--tint": upsell.tint }}>
                      <ProductArt product={upsell} />
                    </div>
                    <div className={styles.upInfo}>
                      <span className={styles.upKicker}>Pairs well</span>
                      <span className={styles.upName}>{upsell.name}</span>
                      <span className="tnum">{inr(upsell.price)}</span>
                    </div>
                    <button type="button" className={styles.upAdd} onClick={() => add(upsell.slug, { openDrawer: false })}>
                      Add
                    </button>
                  </div>
                ) : null}
              </>
            )}

            {lines.length > 0 ? (
              <div className={styles.foot}>
                <dl className={styles.totals}>
                  <div>
                    <dt>Subtotal</dt>
                    <dd className="tnum">{inr(subtotal)}</dd>
                  </div>
                  {savings > 0 ? (
                    <div className={styles.saveRow}>
                      <dt>You save</dt>
                      <dd className="tnum">{inr(savings)}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>Delivery</dt>
                    <dd>{remaining > 0 ? "Calculated at checkout" : "Free"}</dd>
                  </div>
                </dl>
                <Button full size="lg" icon={<PiLockSimple />} aria-disabled="true" title="Secure checkout connects to Shopify at launch">
                  Secure checkout
                </Button>
                <p className={styles.note}>UPI, cards, net banking &amp; cash on delivery. Checkout opens with our Shopify launch.</p>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
