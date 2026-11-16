import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import styles from "./not-found.module.scss";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.halves} aria-hidden="true">
          <span className={styles.left} />
          <span className={styles.right} />
        </div>
        <p className="eyebrow">Error 404</p>
        <h1 className={styles.title}>
          This page went <em>a shade too far.</em>
        </h1>
        <p className={styles.lede}>The link may be old, or the page may have moved. Let&apos;s get you back to colour.</p>
        <div className={styles.ctas}>
          <Link href="/" className={styles.primary}>
            Back to home <PiArrowRight aria-hidden="true" />
          </Link>
          <Link href="/shop" className={styles.link}>
            Shop all
          </Link>
          <Link href="/faq" className={styles.link}>
            FAQ
          </Link>
          <Link href="/contact" className={styles.link}>
            Support
          </Link>
        </div>
      </div>
    </section>
  );
}
