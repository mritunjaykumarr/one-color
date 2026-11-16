import Link from "next/link";
import { PiWhatsappLogo, PiEnvelopeSimple, PiPhone, PiClock, PiArrowRight, PiQuestion, PiTruck, PiArrowCounterClockwise } from "react-icons/pi";
import PageHero from "../../../components/pages/PageHero";
import ContactForm from "../../../components/contact/ContactForm";
import TrackOrder from "../../../components/contact/TrackOrder";
import Reveal from "../../../components/ui/Reveal";
import { SITE } from "../../../data/content";
import { IMG } from "../../../data/media";
import styles from "./page.module.scss";

export const metadata = {
  title: "Contact & support",
  description: "Talk to a OneColor colour expert on WhatsApp, email or phone. Help with shades, orders, tracking, returns and shade exchanges.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const channels = [
    { icon: PiWhatsappLogo, title: "WhatsApp", value: "Fastest: under an hour", href: `https://wa.me/${SITE.whatsapp}`, external: true, accent: true },
    { icon: PiEnvelopeSimple, title: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: PiPhone, title: "Call", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Support"
        title={
          <>
            Real people, <em>real colour advice.</em>
          </>
        }
        lede="Questions about a shade, an order or a result? Our team of colour experts answers every message, usually within the hour."
        image={IMG.pinkSmile}
      >
        <p className={styles.hours}>
          <PiClock aria-hidden="true" /> {SITE.hours}
        </p>
      </PageHero>

      <section className={styles.channelsWrap} aria-label="Ways to reach us">
        <div className={`container ${styles.channels}`}>
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className={`${styles.channel} ${c.accent ? styles.channelAccent : ""}`}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <c.icon aria-hidden="true" />
              <span className={styles.chTitle}>{c.title}</span>
              <span className={styles.chValue}>{c.value}</span>
            </a>
          ))}
        </div>
      </section>

      <section className={`section ${styles.main}`} aria-labelledby="form-title">
        <div className={`container ${styles.grid}`}>
          <Reveal className={styles.formCard}>
            <h2 id="form-title" className={styles.h2}>
              Send us <em>a message.</em>
            </h2>
            <p className={styles.sub}>We reply within one working day. For anything urgent, WhatsApp is quickest.</p>
            <ContactForm />
          </Reveal>

          <div className={styles.side}>
            <Reveal className={styles.track} delay={0.06}>
              <div id="track" className={styles.anchor} />
              <p className={`eyebrow ${styles.lightEyebrow}`}>Track your order</p>
              <h2 className={styles.trackTitle}>Where&apos;s my colour?</h2>
              <TrackOrder whatsapp={SITE.whatsapp} />
            </Reveal>

            <Reveal className={styles.quick} delay={0.1}>
              <p className="eyebrow">Quick answers</p>
              <ul>
                <li>
                  <Link href="/faq">
                    <PiQuestion aria-hidden="true" /> FAQ: patch tests, coverage, the bottle <PiArrowRight aria-hidden="true" className={styles.go} />
                  </Link>
                </li>
                <li>
                  <Link href="/policies/shipping-returns">
                    <PiTruck aria-hidden="true" /> Delivery times &amp; COD <PiArrowRight aria-hidden="true" className={styles.go} />
                  </Link>
                </li>
                <li>
                  <Link href="/policies/shipping-returns">
                    <PiArrowCounterClockwise aria-hidden="true" /> Returns &amp; shade exchange <PiArrowRight aria-hidden="true" className={styles.go} />
                  </Link>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
