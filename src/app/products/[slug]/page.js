import { notFound } from "next/navigation";
import ProductTop from "../../../../components/product/ProductTop";
import { StepsStrip, ProductReviews, SafetyBlock } from "../../../../components/product/ProductSections";
import ColourStudio from "../../../../components/studio/ColourStudio";
import FaqSection from "../../../../components/home/FaqSection";
import RitualRail from "../../../../components/home/RitualRail";
import { PRODUCTS, ALL_SHADES, LAUNCH_SHADES, getProduct } from "../../../../data/products";
import { FAQS, SITE } from "../../../../data/content";
import { SHADE_IMAGES, VIDEO, IMG } from "../../../../data/media";
import styles from "./page.module.scss";

// Every product is prerendered from generateStaticParams; unknown slugs 404.
export const instant = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product not found" };
  const isShade = p.category === "hair-colour";
  const title = isShade ? `${p.code} ${p.name} permanent hair colour` : p.title;
  const img = isShade ? SHADE_IMAGES[p.imageKey].portrait.src : IMG.combing.src;
  return {
    title,
    description: `${p.tagline} ${p.description}`.slice(0, 158),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { type: "website", title: `${title} | OneColor`, description: p.tagline, images: [{ url: img.startsWith("http") ? `${img}?w=1200&q=75` : `${SITE.url}${img}` }] },
  };
}

const PDP_FAQ = ["Do I need a patch test?", "Will it cover 100% grey?", "How long does the colour last?", "Can I really reuse it?", "What if the shade isn't right?"];

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const isShade = p.category === "hair-colour";
  const imgs = isShade ? SHADE_IMAGES[p.imageKey] : null;
  const slides = isShade
    ? [
        { kind: "img", img: imgs.portrait },
        { kind: "img", img: imgs.hair, note: `${p.name} on hair · placeholder` },
        { kind: "art" },
        { kind: "compare", img: imgs.life, note: "Simulated before / after" },
        { kind: "video", video: VIDEO.application },
      ]
    : [{ kind: "art" }, { kind: "img", img: IMG.combing }, { kind: "video", video: VIDEO.application }];

  const allFaqs = FAQS.flatMap((g) => g.items);
  const faqs = PDP_FAQ.map((q) => allFaqs.find((f) => f.q === q)).filter(Boolean);
  const studioIdx = LAUNCH_SHADES.findIndex((s) => s.slug === p.slug);
  const cross = (isShade ? ["complete-colour-kit", "root-touch-up-duo", "colour-lock-conditioner", "nitrile-gloves"] : ["complete-colour-kit", "natural-black", "burgundy-wine", "colour-lock-conditioner"])
    .filter((s) => s !== p.slug)
    .slice(0, 4)
    .map(getProduct);
  const others = ALL_SHADES.filter((s) => s.slug !== p.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `OneColor ${p.title}`,
    description: p.description,
    brand: { "@type": "Brand", name: "OneColor" },
    sku: p.slug,
    image: isShade
      ? [imgs.portrait.src.startsWith("http") ? imgs.portrait.src : `${SITE.url}${imgs.portrait.src}`]
      : [IMG.combing.src.startsWith("http") ? IMG.combing.src : `${SITE.url}${IMG.combing.src}`],
    ...(p.reviews ? { aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews } } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: p.price,
      availability: p.status === "in-stock" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: `${SITE.url}/products/${p.slug}`,
    },
  };

  return (
    <div className={styles.page} style={{ "--accent": p.category === "hair-colour" ? p.glow : "var(--c-berry-600)", "--accent-tint": p.tint, "--accent-glow": p.glow }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className={styles.wash} aria-hidden="true" />
      <ProductTop product={p} shades={ALL_SHADES} slides={slides} />
      {isShade ? <StepsStrip product={p} /> : null}
      {isShade && studioIdx >= 0 ? <ColourStudio shades={LAUNCH_SHADES} initial={studioIdx} compact /> : null}
      <ProductReviews product={p} />
      <SafetyBlock product={p} />
      <FaqSection items={faqs} eyebrow="Before you buy" />
      <RitualRail products={cross} eyebrow="Complete the ritual" title={<>Pairs well with <em>{isShade ? "this shade." : "your colour."}</em></>} />
      {isShade ? <RitualRail products={others} eyebrow="Compare shades" title={<>Not quite the one? <em>Meet the family.</em></>} cta={{ href: "/shop?category=hair-colour", label: "All shades" }} /> : null}
    </div>
  );
}
