"use client";

import { PiCheckBold, PiStarFill } from "react-icons/pi";
import PriceRange from "./PriceRange";
import { CATEGORIES, FAMILIES, TONES, COVERAGE, PACKS, PRICE_BANDS } from "../../data/products";
import { PRICE_FLOOR, PRICE_CEIL } from "../../lib/shop";
import styles from "./FilterPanel.module.scss";

function Group({ title, children, defaultOpen = true }) {
  return (
    <details className={styles.group} open={defaultOpen}>
      <summary className={styles.summary}>
        <span>{title}</span>
        <span className={styles.chev} aria-hidden="true" />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}

function Check({ checked, onChange, label, count, swatch, disabled }) {
  return (
    <label className={`${styles.check} ${disabled ? styles.disabled : ""}`}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled && !checked} />
      <span className={styles.box} aria-hidden="true">
        <PiCheckBold />
      </span>
      {swatch ? <span className={styles.swatch} style={{ background: swatch }} aria-hidden="true" /> : null}
      <span className={styles.label}>{label}</span>
      {typeof count === "number" ? <span className={`${styles.count} tnum`}>{count}</span> : null}
    </label>
  );
}

export default function FilterPanel({ f, counts, toggle, set }) {
  const multi = (key, items, opts = {}) =>
    items.map((it) => {
      const c = counts[key]?.[it.id] ?? 0;
      return (
        <Check
          key={it.id}
          checked={f[key].includes(it.id)}
          onChange={() => toggle(key, it.id)}
          label={it.label}
          count={c}
          swatch={opts.swatch ? it.hex : undefined}
          disabled={c === 0}
        />
      );
    });

  return (
    <div className={styles.panel}>
      <Group title="Category">{multi("category", CATEGORIES)}</Group>
      <Group title="Shade family">{multi("family", FAMILIES, { swatch: true })}</Group>
      <Group title="Price">
        <div className={styles.stack}>{multi("price", PRICE_BANDS)}</div>
        <div className={styles.range}>
          <PriceRange min={f.min} max={f.max} floor={PRICE_FLOOR} ceil={PRICE_CEIL} onCommit={(lo, hi) => set({ min: lo, max: hi })} />
        </div>
      </Group>
      <Group title="Pack type">{multi("pack", PACKS)}</Group>
      <Group title="Tone" defaultOpen={false}>
        {multi("tone", TONES)}
      </Group>
      <Group title="Grey coverage" defaultOpen={false}>
        {multi("coverage", COVERAGE)}
      </Group>
      <Group title="Customer rating" defaultOpen={false}>
        <Check
          checked={f.rating === 4}
          onChange={() => set({ rating: f.rating === 4 ? 0 : 4 })}
          label={
            <span className={styles.stars}>
              4<PiStarFill aria-hidden="true" /> &amp; above
            </span>
          }
        />
      </Group>
      <Group title="Availability & offers" defaultOpen={false}>
        <Check checked={f.instock} onChange={() => set({ instock: !f.instock })} label="In stock only" />
        <Check checked={f.sale} onChange={() => set({ sale: !f.sale })} label="15% off or more" />
      </Group>
    </div>
  );
}
