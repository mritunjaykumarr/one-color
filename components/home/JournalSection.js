import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import PostCard from "../blog/PostCard";
import Reveal, { RevealItem } from "../ui/Reveal";
import styles from "./JournalSection.module.scss";
import FlashText from "../ui/FlashText";

export default function JournalSection({ posts }) {
  const [lead, ...rest] = posts;
  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="journal-title">
      <div className={`container ${styles.head}`}>
        <Reveal>
          <p className="eyebrow">The colour journal</p>
          <FlashText as="h2" id="journal-title" className={styles.title}>
            Guides for every <em>grey, shade &amp; doubt.</em>
          </FlashText>
        </Reveal>
        <Link href="/blog" className={styles.all}>
          All guides <PiArrowRight aria-hidden="true" />
        </Link>
      </div>
      <Reveal stagger className={`container ${styles.grid}`}>
        <RevealItem className={styles.lead}>
          <PostCard post={lead} size="lg" />
        </RevealItem>
        <div className={styles.stack}>
          {rest.slice(0, 3).map((p) => (
            <RevealItem key={p.slug}>
              <PostCard post={p} size="row" />
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
