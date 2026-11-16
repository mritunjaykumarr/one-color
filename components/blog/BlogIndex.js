"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PostCard from "./PostCard";
import styles from "./BlogIndex.module.scss";

export default function BlogIndex({ posts }) {
  const cats = useMemo(() => ["All", ...new Set(posts.map((p) => p.category))], [posts]);
  const [cat, setCat] = useState("All");
  const reduce = useReducedMotion();
  const list = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  const [lead, ...rest] = list;

  return (
    <div className={styles.wrap}>
      <div className={styles.chips} role="tablist" aria-label="Filter guides by topic">
        {cats.map((c) => (
          <button key={c} type="button" role="tab" aria-selected={cat === c} className={`${styles.chip} ${cat === c ? styles.on : ""}`} onClick={() => setCat(c)}>
            {c}
            <span className="tnum">{c === "All" ? posts.length : posts.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cat}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={styles.layout}
        >
          {lead ? (
            <div className={styles.lead}>
              <PostCard post={lead} size="lg" />
            </div>
          ) : null}
          {rest.length ? (
            <div className={styles.grid}>
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
