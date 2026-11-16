"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { PiMagnifyingGlass, PiX } from "react-icons/pi";
import Accordion from "../ui/Accordion";
import styles from "./FaqExplorer.module.scss";

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function FaqExplorer({ groups }) {
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q.trim().toLowerCase().slice(0, 60));

  const filtered = useMemo(() => {
    if (!dq) return groups;
    const terms = dq.split(/\s+/).filter(Boolean);
    return groups
      .map((g) => ({ ...g, items: g.items.filter((it) => terms.every((t) => `${it.q} ${it.a}`.toLowerCase().includes(t))) }))
      .filter((g) => g.items.length);
  }, [dq, groups]);

  const count = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className={styles.wrap}>
      <div className={styles.tools}>
        <div className={styles.search}>
          <PiMagnifyingGlass aria-hidden="true" />
          <label htmlFor="faq-q" className="sr-only">
            Search questions
          </label>
          <input id="faq-q" type="search" placeholder="Search: patch test, henna, COD…" value={q} maxLength={60} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
          {q ? (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search">
              <PiX />
            </button>
          ) : null}
        </div>
        <nav className={styles.jump} aria-label="FAQ categories">
          {groups.map((g) => (
            <a key={g.cat} href={`#${slugify(g.cat)}`}>
              {g.cat}
            </a>
          ))}
        </nav>
      </div>

      <p className={styles.count} aria-live="polite">
        {dq ? `${count} ${count === 1 ? "answer" : "answers"} for “${q.trim()}”` : `${count} answers in ${groups.length} topics`}
      </p>

      {filtered.length ? (
        <div className={styles.groups}>
          {filtered.map((g) => (
            <section key={`${g.cat}-${dq}`} id={slugify(g.cat)} className={styles.group} aria-labelledby={`h-${slugify(g.cat)}`}>
              <h2 id={`h-${slugify(g.cat)}`} className={styles.h2}>
                {g.cat}
              </h2>
              <Accordion items={g.items} defaultOpen={dq ? 0 : -1} />
            </section>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No answer for that yet.</p>
          <p>Try another word, or ask a colour expert directly. We reply within the hour.</p>
        </div>
      )}
    </div>
  );
}
