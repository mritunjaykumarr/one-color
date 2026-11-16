"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PiArrowUpRight, PiArrowRight } from "react-icons/pi";
import Reveal, { RevealItem } from "../ui/Reveal";
import { useUI } from "../layout/UIProvider";
import { SHADE_IMAGES } from "../../data/media";
import styles from "./ShadeWall.module.scss";
import FlashText from "../ui/FlashText";

export default function ShadeWall({ shades, upcoming }) {
  const [active, setActive] = useState(0);
  const { setFinderOpen } = useUI();

  return (
    <section className={`section ${styles.wrap}`} id="shades" aria-labelledby="shades-title">
      <div className={`container ${styles.head}`}>
        <Reveal>
          <p className="eyebrow">Five shades · four more on the way</p>
          <FlashText as="h2" id="shades-title" className={styles.title}>
            Find the one that&apos;s <em>yours.</em>
          </FlashText>
        </Reveal>
        <Reveal className={styles.headAside} delay={0.1}>
          <p>Every shade covers greys to the root and is tuned for Indian hair. Not sure? It takes three taps.</p>
          <button type="button" className={styles.finderBtn} onClick={() => setFinderOpen(true)}>
            Take the shade finder <PiArrowRight aria-hidden="true" />
          </button>
        </Reveal>
      </div>

      <Reveal stagger className={`container ${styles.wall}`}>
        {shades.map((s, i) => {
          const img = SHADE_IMAGES[s.imageKey].portrait;
          return (
            <RevealItem
              key={s.slug}
              className={`${styles.panel} ${i === active ? styles.open : ""}`}
              style={{ "--hex": s.hex, "--glow": s.glow }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <Link href={`/products/${s.slug}`} className={styles.link} aria-label={`${s.code} ${s.name}: ${s.tagline}`}>
                <Image src={img.src} alt="" fill sizes="(min-width: 900px) 40vw, 78vw" className={styles.img} />
                <span className={styles.veil} aria-hidden="true" />
                <span className={styles.code}>{s.code}</span>
                <span className={styles.body}>
                  <span className={styles.name}>{s.name}</span>
                  <span className={styles.tag}>{s.tagline}</span>
                  <span className={styles.go}>
                    Shop shade <PiArrowUpRight aria-hidden="true" />
                  </span>
                </span>
                <span className={styles.chip} aria-hidden="true" />
              </Link>
            </RevealItem>
          );
        })}
      </Reveal>

      <div className={`container ${styles.foot}`}>
        <div className={styles.soon}>
          <span className={styles.soonLabel}>Coming soon</span>
          {upcoming.map((s) => (
            <Link key={s.slug} href={`/products/${s.slug}`} className={styles.soonItem} style={{ "--hex": s.hex, "--glow": s.glow }}>
              <span className={styles.soonDot} aria-hidden="true" />
              {s.name}
            </Link>
          ))}
        </div>
        <Link href="/shop" className={styles.all}>
          Shop all 18 products <PiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
