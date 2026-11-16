import Link from "next/link";
import Image from "next/image";
import { PiArrowRight, PiPlayFill } from "react-icons/pi";
import Stars from "../ui/Stars";
import Reveal from "../ui/Reveal";
import ReviewsMarquee from "../reviews/ReviewsMarquee";
import { REVIEWS, REVIEW_HIGHLIGHTS, RATING } from "../../data/content";
import { IMG } from "../../data/media";
import styles from "./ReviewsSection.module.scss";
import FlashText from "../ui/FlashText";

export default function ReviewsSection() {
  return (
    <section className={`section ${styles.wrap}`} id="reviews" aria-labelledby="reviews-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <Reveal>
            <p className="eyebrow">Reviews &amp; real hair</p>
            <FlashText as="h2" id="reviews-title" className={styles.title}>
              733 people, <em>one click each.</em>
            </FlashText>
            <div className={styles.summary}>
              <Stars value={RATING.average} size={18} />
              <span className="tnum">
                <strong>{RATING.average}</strong> / 5 average
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className={styles.chipsLabel}>What people mention most</p>
            <ul className={styles.chips}>
              {REVIEW_HIGHLIGHTS.map((h) => (
                <li key={h.label}>
                  {h.label} <span className="tnum">{h.count}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <Link href="/how-it-works#open" className={styles.clip}>
              <span className={styles.clipThumb}>
                <Image src={IMG.gloveApply.src} alt="" fill sizes="120px" />
                <span className={styles.play} aria-hidden="true">
                  <PiPlayFill />
                </span>
              </span>
              <span className={styles.clipText}>
                <strong>Box tight? Gloves thin?</strong>
                <span>Watch the 40-second “how to open &amp; use” clip.</span>
              </span>
            </Link>
          </Reveal>

          <Link href="/reviews" className={styles.all}>
            Read all reviews <PiArrowRight aria-hidden="true" />
          </Link>
          <p className="ph-note">Launch preview: reviews shown are illustrative until verified orders come in.</p>
        </div>

        <div className={styles.wallCol}>
          <ReviewsMarquee reviews={REVIEWS} columns={3} />
        </div>
      </div>
    </section>
  );
}
