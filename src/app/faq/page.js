import Image from "next/image";
import Link from "next/link";
import { PiWhatsappLogo, PiEnvelopeSimple, PiArrowRight } from "react-icons/pi";
import PageHero from "../../../components/pages/PageHero";
import FaqExplorer from "../../../components/faq/FaqExplorer";
import { FAQS, SITE } from "../../../data/content";
import { IMG } from "../../../data/media";
import styles from "./page.module.scss";

export const metadata = {
  title: "FAQ: patch tests, grey coverage, the bottle & delivery",
  description:
    "Answers on OneColor permanent hair colour: patch tests, 100% grey coverage, henna-treated hair, how long colour lasts, reusing the one-click bottle, COD and returns.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.flatMap((g) => g.items).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        tone="plain"
        eyebrow="Help centre"
        title={
          <>
            Every question, <em>answered kindly.</em>
          </>
        }
        lede="From your first patch test to your fourth root touch-up. Can't find it? A real colour expert is a message away."
      />
      <section className={styles.section}>
        <div className={`container ${styles.grid}`}>
          <FaqExplorer groups={FAQS} />
          <aside className={styles.aside}>
            <div className={styles.card}>
              <div className={styles.photo}>
                <Image src={IMG.smileGlasses.src} alt={IMG.smileGlasses.alt} fill sizes="320px" />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardTitle}>Talk to a colour expert</p>
                <p className={styles.cardText}>Send a daylight photo of your hair. We&apos;ll recommend a shade within the hour, {SITE.hours}.</p>
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.wa}>
                  <PiWhatsappLogo aria-hidden="true" /> WhatsApp us
                </a>
                <a href={`mailto:${SITE.email}`} className={styles.mail}>
                  <PiEnvelopeSimple aria-hidden="true" /> {SITE.email}
                </a>
              </div>
            </div>
            <Link href="/policies/shipping-returns" className={styles.policy}>
              Shipping &amp; returns policy <PiArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
