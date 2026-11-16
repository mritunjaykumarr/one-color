import Image from "next/image";
import Reveal from "../ui/Reveal";
import styles from "./PageHero.module.scss";

/* Shared inner-page hero: eyebrow + display title + lede, with an optional arch image or custom aside. */
export default function PageHero({ eyebrow, title, lede, image, aside, children, tone = "warm" }) {
  return (
    <section className={`${styles.hero} ${styles[tone]}`}>
      <div className={styles.wash} aria-hidden="true" />
      <div className={`container ${styles.grid} ${image || aside ? styles.split : ""}`}>
        <Reveal className={styles.copy}>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className={styles.title}>{title}</h1>
          {lede ? <p className={styles.lede}>{lede}</p> : null}
          {children}
        </Reveal>
        {image ? (
          <Reveal className={styles.media} delay={0.1}>
            <div className={styles.arch}>
              <Image src={image.src} alt={image.alt} fill preload loading="eager" sizes="(min-width: 900px) 40vw, 90vw" />
            </div>
          </Reveal>
        ) : null}
        {aside ? (
          <Reveal className={styles.aside} delay={0.1}>
            {aside}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
