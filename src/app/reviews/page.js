import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import PageHero from "../../../components/pages/PageHero";
import ReviewsExplorer from "../../../components/reviews/ReviewsExplorer";
import ResultsGallery from "../../../components/reviews/ResultsGallery";
import Stars from "../../../components/ui/Stars";
import Reveal from "../../../components/ui/Reveal";
import { RATING, RATING_DIST, REVIEW_HIGHLIGHTS, SITE } from "../../../data/content";
import styles from "./page.module.scss";

export const metadata = {
  title: "Reviews & real results",
  description: `Rated ${RATING.average}/5 by ${RATING.count} customers. Photo reviews, before-and-after results across ages 23–60, and honest notes on OneColor's one-click hair colour.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const total = Object.values(RATING_DIST).reduce((a, b) => a + b, 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: "OneColor",
    url: SITE.url,
    aggregateRating: { "@type": "AggregateRating", ratingValue: RATING.average, reviewCount: RATING.count, bestRating: 5 },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow="Reviews & results"
        title={
          <>
            Real hair. <em>Real people.</em>
          </>
        }
        lede="Photo reviews from people aged 23 to 60, across every hair type, plus before-and-after results you can trace back to the exact shade."
        aside={
          <div className={styles.summary}>
            <div className={styles.scoreRow}>
              <span className={`${styles.big} tnum`}>{RATING.average}</span>
              <span className={styles.scoreMeta}>
                <Stars value={RATING.average} size={18} />
                <span className="tnum">{RATING.count} reviews</span>
              </span>
            </div>
            <ul className={styles.dist} aria-label="Rating distribution">
              {[5, 4, 3, 2, 1].map((n) => {
                const pct = Math.round((RATING_DIST[n] / total) * 100);
                return (
                  <li key={n}>
                    <span className={styles.distLabel}>{n} ★</span>
                    <span className={styles.distBar} aria-hidden="true">
                      <span style={{ transform: `scaleX(${pct / 100})` }} />
                    </span>
                    <span className={`${styles.distPct} tnum`}>{pct}%</span>
                  </li>
                );
              })}
            </ul>
            <ul className={styles.chips}>
              {REVIEW_HIGHLIGHTS.map((h) => (
                <li key={h.label}>
                  {h.label} <span className="tnum">{h.count}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section className={`section ${styles.reviews}`} aria-labelledby="all-reviews">
        <div className="container">
          <Reveal className={styles.head}>
            <h2 id="all-reviews" className={styles.h2}>
              Photo reviews <em>first.</em>
            </h2>
            <p className="ph-note">Launch preview: reviews shown are illustrative until verified orders come in.</p>
          </Reveal>
          <ReviewsExplorer />
        </div>
      </section>

      <section className={`section ${styles.results}`} id="results" aria-labelledby="results-title">
        <div className="container">
          <Reveal className={styles.head}>
            <p className="eyebrow">Results gallery</p>
            <h2 id="results-title" className={styles.h2}>
              Drag to see <em>the difference.</em>
            </h2>
          </Reveal>
          <ResultsGallery />
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>
            Your result is <em>one click away.</em>
          </h2>
          <Link href="/shop?category=hair-colour" className={styles.ctaBtn}>
            Find your shade <PiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
