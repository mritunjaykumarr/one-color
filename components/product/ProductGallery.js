"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PiPlayFill } from "react-icons/pi";
import ProductArt from "./ProductArt";
import ImageCompare from "../ui/ImageCompare";
import InViewVideo from "../ui/InViewVideo";
import styles from "./ProductGallery.module.scss";

const SIM_GREY = "grayscale(0.9) brightness(1.18) contrast(0.92) sepia(0.12)";

/*
  slides: [{ kind: "art" } | { kind: "img", img } | { kind: "compare", img } | { kind: "video", video }]
  Mobile: native scroll-snap carousel with dots. Desktop: thumbnails + stage.
*/
export default function ProductGallery({ product, slides }) {
  const [i, setI] = useState(0);
  const rail = useRef(null);

  function go(k) {
    setI(k);
    const el = rail.current?.children[k];
    if (el && rail.current) rail.current.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  }

  function onScroll() {
    const r = rail.current;
    if (!r) return;
    const k = Math.round(r.scrollLeft / r.clientWidth);
    if (k !== i) setI(k);
  }

  return (
    <div className={styles.gallery} style={{ "--tint": product.tint, "--hex": product.hex, "--glow": product.glow }}>
      <div className={styles.thumbs} role="tablist" aria-label="Product images">
        {slides.map((s, k) => (
          <button key={k} type="button" role="tab" aria-selected={k === i} aria-label={labelFor(s, k)} className={`${styles.thumb} ${k === i ? styles.thumbOn : ""}`} onClick={() => go(k)}>
            {s.kind === "art" ? (
              <span className={styles.thumbArt}>
                <ProductArt product={product} />
              </span>
            ) : s.kind === "video" ? (
              <>
                <Image src={s.video.poster} alt="" fill sizes="80px" />
                <span className={styles.thumbPlay} aria-hidden="true">
                  <PiPlayFill />
                </span>
              </>
            ) : (
              <Image src={s.img.src} alt="" fill sizes="80px" style={s.kind === "compare" ? { filter: "saturate(.6)" } : undefined} />
            )}
          </button>
        ))}
      </div>

      <div className={styles.stageWrap}>
        <div className={styles.rail} ref={rail} onScroll={onScroll}>
          {slides.map((s, k) => (
            <div key={k} className={styles.slide} aria-hidden={k !== i} inert={k !== i ? true : undefined}>
              {s.kind === "art" ? (
                <div className={styles.artStage}>
                  <span className={styles.ring} aria-hidden="true" />
                  <div className={styles.art}>
                    <ProductArt product={product} />
                  </div>
                </div>
              ) : s.kind === "img" ? (
                <Image src={s.img.src} alt={s.img.alt} fill sizes="(min-width: 900px) 46vw, 100vw" className={styles.photo} preload={k === 0} loading={k === 0 ? "eager" : undefined} />
              ) : s.kind === "compare" ? (
                <ImageCompare before={s.img} after={s.img} beforeFilter={SIM_GREY} beforeLabel="Before" afterLabel={`After · ${product.code || ""}`} sizes="(min-width: 900px) 46vw, 100vw" />
              ) : (
                <InViewVideo src={s.video.src} poster={s.video.poster} label="How to apply OneColor" />
              )}
              {s.note ? <span className={styles.note}>{s.note}</span> : null}
            </div>
          ))}
        </div>
        <div className={styles.dots} aria-hidden="true">
          {slides.map((_, k) => (
            <span key={k} className={k === i ? styles.dotOn : ""} />
          ))}
        </div>
      </div>
    </div>
  );
}

function labelFor(s, k) {
  return { art: "Product render", img: "Photo", compare: "Before and after", video: "Application video" }[s.kind] + ` (${k + 1})`;
}
