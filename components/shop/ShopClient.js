"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { PiMagnifyingGlass, PiSlidersHorizontal, PiX, PiArrowRight } from "react-icons/pi";
import ProductCard from "../product/ProductCard";
import FilterPanel from "./FilterPanel";
import { useUI } from "../layout/UIProvider";
import { parseFilters, filtersToQuery, applyFilters, facetCounts, activeFilterCount, normaliseQuery, PRICE_FLOOR, PRICE_CEIL } from "../../lib/shop";
import { CATEGORIES, FAMILIES, TONES, COVERAGE, PACKS, PRICE_BANDS, SORTS } from "../../data/products";
import { inr } from "../../lib/format";
import styles from "./ShopClient.module.scss";

const LABELS = {
  category: Object.fromEntries(CATEGORIES.map((x) => [x.id, x.label])),
  family: Object.fromEntries(FAMILIES.map((x) => [x.id, x.label])),
  tone: Object.fromEntries(TONES.map((x) => [x.id, `${x.label} tone`])),
  coverage: Object.fromEntries(COVERAGE.map((x) => [x.id, x.label])),
  pack: Object.fromEntries(PACKS.map((x) => [x.id, x.label])),
  price: Object.fromEntries(PRICE_BANDS.map((x) => [x.id, x.label])),
};

const EASE = [0.16, 1, 0.3, 1];

export default function ShopClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const reduce = useReducedMotion();
  const { setFinderOpen } = useUI();

  const f = useMemo(() => parseFilters(sp), [sp]);
  const results = useMemo(() => applyFilters(f), [f]);
  const counts = useMemo(() => facetCounts(f), [f]);
  const nActive = activeFilterCount(f);

  const [q, setQ] = useState(f.q);
  const [sheet, setSheet] = useState(false);
  const typing = useRef(null);

  const [lastQ, setLastQ] = useState(f.q);
  if (f.q !== lastQ) {
    setLastQ(f.q);
    setQ(f.q);
  }

  useEffect(() => {
    if (!sheet) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  function push(next) {
    startTransition(() => router.replace(`${pathname}${filtersToQuery(next)}`, { scroll: false }));
  }
  const set = (patch) => push({ ...f, ...patch });
  const toggle = (key, id) => set({ [key]: f[key].includes(id) ? f[key].filter((x) => x !== id) : [...f[key], id] });
  const clearAll = () => push({ ...parseFilters(new URLSearchParams()), q: f.q, sort: f.sort });

  function onSearch(v) {
    setQ(v);
    window.clearTimeout(typing.current);
    typing.current = window.setTimeout(() => set({ q: normaliseQuery(v) }), 260);
  }

  const chips = [];
  ["category", "family", "tone", "coverage", "pack", "price"].forEach((k) => f[k].forEach((id) => chips.push({ k, id, label: LABELS[k][id], onRemove: () => toggle(k, id) })));
  if (f.min > PRICE_FLOOR || f.max < PRICE_CEIL) chips.push({ k: "range", id: "r", label: `${inr(f.min)} – ${inr(f.max)}`, onRemove: () => set({ min: PRICE_FLOOR, max: PRICE_CEIL }) });
  if (f.rating) chips.push({ k: "rating", id: "4", label: "4★ & above", onRemove: () => set({ rating: 0 }) });
  if (f.instock) chips.push({ k: "instock", id: "1", label: "In stock", onRemove: () => set({ instock: false }) });
  if (f.sale) chips.push({ k: "sale", id: "1", label: "15%+ off", onRemove: () => set({ sale: false }) });

  const onlyCat = f.category.length === 1 ? CATEGORIES.find((c) => c.id === f.category[0]) : null;
  const heading = f.q ? `Results for “${f.q}”` : onlyCat ? onlyCat.label : "Shop all";
  const showFinder = !f.q && (f.category.length === 0 || f.category.includes("hair-colour"));

  return (
    <div className={styles.shop}>
      <header className={`container ${styles.head}`}>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Shop</span>
        </nav>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{heading}</h1>
          <p className={`${styles.count} tnum`} aria-live="polite">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
        </div>

        <form className={styles.search} role="search" onSubmit={(e) => { e.preventDefault(); window.clearTimeout(typing.current); set({ q: normaliseQuery(q) }); }}>
          <PiMagnifyingGlass aria-hidden="true" />
          <label htmlFor="shop-q" className="sr-only">
            Search products
          </label>
          <input id="shop-q" type="search" value={q} maxLength={60} autoComplete="off" placeholder="Search by shade, code (e.g. 4.62), or product" onChange={(e) => onSearch(e.target.value)} />
          {q ? (
            <button type="button" className={styles.clearQ} onClick={() => { setQ(""); set({ q: "" }); }} aria-label="Clear search">
              <PiX />
            </button>
          ) : null}
        </form>

        <LayoutGroup id="cats">
          <div className={styles.cats} role="group" aria-label="Category">
            {[{ id: "", label: "All" }, ...CATEGORIES].map((c) => {
              const on = c.id === "" ? f.category.length === 0 : f.category.length === 1 && f.category[0] === c.id;
              return (
                <button key={c.id || "all"} type="button" className={`${styles.cat} ${on ? styles.catOn : ""}`} onClick={() => set({ category: c.id ? [c.id] : [], family: c.id && c.id !== "hair-colour" ? [] : f.family })} aria-pressed={on}>
                  {on ? <motion.span layoutId="cat-pill" className={styles.catPill} transition={{ duration: reduce ? 0 : 0.45, ease: EASE }} /> : null}
                  <span className={styles.catLabel}>{c.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {f.category.length === 0 || f.category.includes("hair-colour") ? (
          <div className={styles.families}>
            {FAMILIES.map((fam) => {
              const on = f.family.includes(fam.id);
              return (
                <button key={fam.id} type="button" className={`${styles.fam} ${on ? styles.famOn : ""}`} onClick={() => toggle("family", fam.id)} aria-pressed={on}>
                  <span className={styles.famSw} style={{ background: fam.hex }} aria-hidden="true" />
                  {fam.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </header>

      <div className={`container ${styles.body}`}>
        <aside className={styles.side} aria-label="Filters">
          <div className={styles.sideHead}>
            <p className={styles.sideTitle}>Filters</p>
            {nActive ? (
              <button type="button" className={styles.reset} onClick={clearAll}>
                Clear all ({nActive})
              </button>
            ) : null}
          </div>
          <FilterPanel f={f} counts={counts} toggle={toggle} set={set} />
        </aside>

        <div className={styles.main}>
          <div className={styles.toolbar}>
            <button type="button" className={styles.filterBtn} onClick={() => setSheet(true)}>
              <PiSlidersHorizontal aria-hidden="true" /> Filters
              {nActive ? <span className={`${styles.badge} tnum`}>{nActive}</span> : null}
            </button>
            <div className={styles.chips}>
              {chips.map((c) => (
                <button key={`${c.k}-${c.id}`} type="button" className={styles.chip} onClick={c.onRemove} aria-label={`Remove filter ${c.label}`}>
                  {c.label} <PiX aria-hidden="true" />
                </button>
              ))}
              {chips.length > 1 ? (
                <button type="button" className={styles.clearChips} onClick={clearAll}>
                  Clear all
                </button>
              ) : null}
            </div>
            <label className={styles.sort}>
              <span className={styles.sortLabel}>Sort</span>
              <select value={f.sort} onChange={(e) => set({ sort: e.target.value })}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {showFinder ? (
            <div className={styles.finder}>
              <span className={styles.finderMark} aria-hidden="true" />
              <p>
                <strong>Not sure which shade?</strong> Answer three quick questions and we&apos;ll match you.
              </p>
              <button type="button" onClick={() => setFinderOpen(true)}>
                Find my shade <PiArrowRight aria-hidden="true" />
              </button>
            </div>
          ) : null}

          {results.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyMark} aria-hidden="true" />
              <h2>Nothing matches that, yet.</h2>
              <p>Try fewer filters or a different word. Shade codes like “4.62” work too.</p>
              <div className={styles.emptyActions}>
                <button type="button" onClick={() => push(parseFilters(new URLSearchParams()))}>
                  Reset everything
                </button>
                <button type="button" onClick={() => setFinderOpen(true)}>
                  Use the shade finder
                </button>
              </div>
            </div>
          ) : (
            <motion.ul className={styles.grid} layout={!reduce}>
              <AnimatePresence initial={false} mode="popLayout">
                {results.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: EASE, delay: Math.min(i, 8) * 0.04 }}
                    className={styles.cell}
                  >
                    <ProductCard product={p} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>

      {/* mobile bottom sheet */}
      <AnimatePresence>
        {sheet ? (
          <>
            <motion.div className={styles.scrim} onClick={() => setSheet(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className={styles.sheet}
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={reduce ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className={styles.sheetHead}>
                <p className={styles.sideTitle}>Filters</p>
                <button type="button" className={styles.sheetClose} onClick={() => setSheet(false)} aria-label="Close filters">
                  <PiX />
                </button>
              </div>
              <div className={styles.sheetBody}>
                <FilterPanel f={f} counts={counts} toggle={toggle} set={set} />
              </div>
              <div className={styles.sheetFoot}>
                <button type="button" className={styles.sheetReset} onClick={clearAll} disabled={!nActive}>
                  Clear all
                </button>
                <button type="button" className={styles.sheetApply} onClick={() => setSheet(false)}>
                  Show {results.length} {results.length === 1 ? "result" : "results"}
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
