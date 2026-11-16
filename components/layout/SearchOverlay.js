"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiMagnifyingGlass, PiX, PiArrowUpRight } from "react-icons/pi";
import { useUI } from "./UIProvider";
import { searchProducts, normaliseQuery } from "../../lib/shop";
import { inr } from "../../lib/format";
import ProductArt from "../product/ProductArt";
import styles from "./SearchOverlay.module.scss";

const POPULAR = ["Burgundy", "Natural black", "Grey coverage", "Conditioner", "Kit", "Gloves"];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);
  const inputRef = useRef(null);
  const router = useRouter();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!searchOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, setSearchOpen]);

  const results = normaliseQuery(dq) ? searchProducts(dq).slice(0, 6) : [];

  function submit(e) {
    e.preventDefault();
    const nq = normaliseQuery(q);
    setSearchOpen(false);
    router.push(nq ? `/shop?q=${encodeURIComponent(nq)}` : "/shop");
  }

  return (
    <AnimatePresence>
      {searchOpen ? (
        <motion.div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        >
          <motion.div
            className={styles.panel}
            initial={reduce ? false : { y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container">
              <form className={styles.form} onSubmit={submit} role="search">
                <PiMagnifyingGlass className={styles.lens} aria-hidden="true" />
                <label htmlFor="site-search" className="sr-only">
                  Search shades and products
                </label>
                <input
                  ref={inputRef}
                  id="site-search"
                  type="search"
                  autoComplete="off"
                  maxLength={60}
                  placeholder="Search shades, kits, aftercare…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className={styles.input}
                />
                <button type="button" className={styles.close} onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <PiX />
                </button>
              </form>

              {results.length === 0 ? (
                <div className={styles.popular}>
                  <p className={styles.head}>{normaliseQuery(dq) ? `No match for “${dq}”. Try one of these` : "Popular searches"}</p>
                  <div className={styles.chips}>
                    {POPULAR.map((p) => (
                      <button key={p} type="button" className={styles.chip} onClick={() => setQ(p)}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.results}>
                  <p className={styles.head} aria-live="polite">
                    {results.length} suggestion{results.length > 1 ? "s" : ""}
                  </p>
                  <ul className={styles.list}>
                    {results.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`} className={styles.item} onClick={() => setSearchOpen(false)}>
                          <span className={styles.thumb} style={{ background: p.tint }}>
                            <ProductArt product={p} />
                          </span>
                          <span className={styles.itemText}>
                            <span className={styles.itemName}>{p.title}</span>
                            <span className={styles.itemMeta}>
                              {p.status === "coming-soon" ? "Coming soon" : inr(p.price)} · {p.tagline}
                            </span>
                          </span>
                          <PiArrowUpRight className={styles.go} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className={styles.all} onClick={submit}>
                    See all results for “{dq}”
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
