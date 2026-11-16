import Link from "next/link";
import { PiArrowRight, PiWhatsappLogo } from "react-icons/pi";
import Accordion from "../ui/Accordion";
import Reveal from "../ui/Reveal";
import { SITE } from "../../data/content";
import styles from "./FaqSection.module.scss";
import FlashText from "../ui/FlashText";

export default function FaqSection({ items, title, eyebrow = "Questions, answered", showAllLink = true }) {
  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="faq-title" id="faq">
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <div className={styles.sticky}>
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
              <FlashText as="h2" id="faq-title" className={styles.title}>
                {title || (
                  <>
                    Last doubts, <em>cleared.</em>
                  </>
                )}
              </FlashText>
            </Reveal>
            <Reveal className={styles.expert} delay={0.08}>
              <p className={styles.expertTitle}>Still unsure about your shade?</p>
              <p className={styles.expertText}>Send a photo of your hair in daylight. A colour expert replies within the hour, {SITE.hours}.</p>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.wa}>
                <PiWhatsappLogo aria-hidden="true" /> Chat on WhatsApp
              </a>
            </Reveal>
            {showAllLink ? (
              <Link href="/faq" className={styles.all}>
                All FAQs <PiArrowRight aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
        <Reveal className={styles.list} delay={0.05}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
