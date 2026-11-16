import Link from "next/link";
import { PiArrowRight, PiShieldCheck, PiFlask, PiDrop } from "react-icons/pi";
import BottleBlueprint from "../brand/BottleBlueprint";
import ReviewCard from "../reviews/ReviewCard";
import Stars from "../ui/Stars";
import Reveal, { RevealItem } from "../ui/Reveal";
import { HOW_STEPS, REVIEWS, REVIEW_HIGHLIGHTS, FOUNDER_NOTE, RATING } from "../../data/content";
import styles from "./ProductSections.module.scss";

export function StepsStrip({ product }) {
  const states = ["sealed", "clicked", "clicked"];
  return (
    <section className={`container ${styles.steps}`} aria-labelledby="pdp-steps">
      <div className={styles.stepsHead}>
        <p className="eyebrow">How it works</p>
        <h2 id="pdp-steps" className={styles.h2}>
          Click. Blend. <em>Apply.</em>
        </h2>
        <Link href="/how-it-works" className={styles.link}>
          See the bottle up close <PiArrowRight aria-hidden="true" />
        </Link>
      </div>
      <Reveal stagger as="ol" className={styles.stepList}>
        {HOW_STEPS.map((s, i) => (
          <RevealItem as="li" key={s.n} className={styles.step}>
            <div className={`${styles.stepArt} ${i === 2 ? styles.tilt : ""}`}>
              <BottleBlueprint hex={product.hex} state={states[i]} labels={false} title={`Step ${s.n}: ${s.title}`} />
            </div>
            <span className={styles.n}>{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

export function ProductReviews({ product }) {
  const mine = REVIEWS.filter((r) => r.shade === product.slug);
  const low = mine.length < 2;
  const list = low ? REVIEWS.slice(0, 3) : mine;
  return (
    <section id="reviews" className={styles.reviews} aria-labelledby="pdp-reviews">
      <div className="container">
        <div className={styles.revHead}>
          <div>
            <p className="eyebrow">Reviews</p>
            <h2 id="pdp-reviews" className={styles.h2}>
              {low ? (
                <>
                  New shade, <em>same promise.</em>
                </>
              ) : (
                <>
                  What {product.name} <em>looks like on real hair.</em>
                </>
              )}
            </h2>
          </div>
          <div className={styles.score}>
            <span className={`${styles.big} tnum`}>{product.reviews ? product.rating : RATING.average}</span>
            <span>
              <Stars value={product.reviews ? product.rating : RATING.average} size={15} />
              <small className="tnum">{product.reviews ? `${product.reviews} reviews for this shade` : `${RATING.count} reviews across all shades`}</small>
            </span>
          </div>
        </div>

        <ul className={styles.chips}>
          {REVIEW_HIGHLIGHTS.slice(0, 5).map((h) => (
            <li key={h.label}>{h.label}</li>
          ))}
        </ul>

        {low ? (
          <figure className={styles.founder}>
            <blockquote>“{FOUNDER_NOTE.quote}”</blockquote>
            <figcaption>
              {FOUNDER_NOTE.name} · {FOUNDER_NOTE.role}
            </figcaption>
          </figure>
        ) : null}

        <Reveal stagger className={styles.revGrid}>
          {list.map((r) => (
            <RevealItem key={r.id}>
              <ReviewCard review={r} />
            </RevealItem>
          ))}
        </Reveal>
        <div className={styles.revFoot}>
          <Link href="/reviews" className={styles.link}>
            {low ? "Read reviews for every shade" : "Read all reviews & see results"} <PiArrowRight aria-hidden="true" />
          </Link>
          <p className="ph-note">Launch preview: reviews are illustrative until verified orders arrive.</p>
        </div>
      </div>
    </section>
  );
}

export function SafetyBlock({ product }) {
  const isShade = product.category === "hair-colour";
  return (
    <section className={`container ${styles.safety}`} aria-labelledby="pdp-safety">
      <div className={styles.safetyLead}>
        <p className="eyebrow">What&apos;s inside</p>
        <h2 id="pdp-safety" className={styles.h2}>
          Gentle on scalp, <em>serious about colour.</em>
        </h2>
        <p className={styles.lede}>{product.description}</p>
      </div>
      <div className={styles.safetyGrid}>
        <article>
          <PiFlask aria-hidden="true" />
          <h3>Key ingredients</h3>
          <p>{isShade ? "Ammonia-free* colour cream with conditioning oils, a pH-balanced developer, and no animal-derived ingredients.* Full INCI list printed on every box." : "Free from sulphates and parabens. Full ingredient list printed on the pack."}</p>
        </article>
        <article>
          <PiShieldCheck aria-hidden="true" />
          <h3>Patch test, every time</h3>
          <p>Apply a pea-sized amount behind your ear 48 hours before colouring. Any redness or itching? Don&apos;t use it. <Link href="/blog/patch-test-guide">How to patch test</Link></p>
        </article>
        <article>
          <PiDrop aria-hidden="true" />
          <h3>How long it lasts</h3>
          <p>Permanent colour that grows out rather than washes out. Touch up roots every 4–6 weeks; a clicked bottle keeps for up to 4 months.*</p>
        </article>
      </div>
      <p className="ph-note">* Claims pending final client approval.</p>
    </section>
  );
}
