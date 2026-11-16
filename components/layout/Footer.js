import Link from "next/link";
import { PiInstagramLogo, PiYoutubeLogo, PiWhatsappLogo, PiFacebookLogo, PiEnvelopeSimple, PiPhone } from "react-icons/pi";
import Logo from "../brand/Logo";
import NewsletterForm from "./NewsletterForm";
import { FOOTER_NAV } from "../../data/navigation";
import { SITE } from "../../data/content";
import { LAUNCH_SHADES } from "../../data/products";
import styles from "./Footer.module.scss";

export default function Footer() {
  const year = 2026;
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.top}`}>
        <div className={styles.lead}>
          <h2 className={styles.statement}>
            Two halves.
            <br />
            <em>One colour.</em>
          </h2>
          <p className={styles.sub}>Join 18,000+ people getting shade drops and honest colour advice.</p>
          <NewsletterForm tone="deep" source="footer" />
        </div>

        <nav className={styles.cols} aria-label="Footer">
          {FOOTER_NAV.map((col) => (
            <div key={col.title} className={styles.col}>
              <p className={styles.colTitle}>{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.shadeRow}`}>
        {LAUNCH_SHADES.map((s) => (
          <Link key={s.slug} href={`/products/${s.slug}`} className={styles.shade} style={{ "--hex": s.hex, "--glow": s.glow }}>
            <span className={styles.shadeDot} aria-hidden="true" />
            <span>
              {s.code} {s.name}
            </span>
          </Link>
        ))}
      </div>

      <div className={`container ${styles.mid}`}>
        <div className={styles.contact}>
          <a href={`mailto:${SITE.email}`}>
            <PiEnvelopeSimple aria-hidden="true" /> {SITE.email}
          </a>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
            <PiPhone aria-hidden="true" /> {SITE.phone}
          </a>
          <span className={styles.hours}>{SITE.hours}</span>
        </div>
        <div className={styles.social}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="OneColor on Instagram">
            <PiInstagramLogo />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="OneColor on YouTube">
            <PiYoutubeLogo />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="OneColor on Facebook">
            <PiFacebookLogo />
          </a>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with OneColor on WhatsApp">
            <PiWhatsappLogo />
          </a>
        </div>
      </div>

      <div className={styles.giant} aria-hidden="true">
        <Logo tone="cream" />
      </div>

      <div className={`container ${styles.legal}`}>
        <p>© {year} OneColor India. All rights reserved.</p>
        <p className={styles.pay}>UPI · Cards · Net banking · Cash on delivery</p>
        <p className={styles.ph}>* Claims pending final approval. Brand assets are placeholders.</p>
      </div>
    </footer>
  );
}
