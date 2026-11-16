import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import ProductCard from "../product/ProductCard";
import Reveal, { RevealItem } from "../ui/Reveal";
import styles from "./RitualRail.module.scss";
import FlashText from "../ui/FlashText";

export default function RitualRail({ products, eyebrow = "Complete the ritual", title, sub, cta = { href: "/shop", label: "Shop all products" } }) {
  const hid = `rail-${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section className={`section ${styles.wrap}`} aria-labelledby={hid}>
      <div className={`container ${styles.head}`}>
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <FlashText as="h2" id={hid} className={styles.title}>
            {title || (
              <>
                Kits &amp; care that <em>keep the colour.</em>
              </>
            )}
          </FlashText>
          {sub ? <p className={styles.sub}>{sub}</p> : null}
        </Reveal>
        <Link href={cta.href} className={styles.all}>
          {cta.label} <PiArrowRight aria-hidden="true" />
        </Link>
      </div>
      <Reveal stagger className={`container ${styles.rail}`}>
        {products.map((p) => (
          <RevealItem key={p.slug} className={styles.item}>
            <ProductCard product={p} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
