import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import PostCard from "../../../../components/blog/PostCard";
import { POSTS, SITE } from "../../../../data/content";
import { LAUNCH_SHADES } from "../../../../data/products";
import { formatDate } from "../../../../lib/format";
import styles from "./page.module.scss";

// Every valid slug is prerendered via generateStaticParams; unknown slugs 404 at request time,
// so instant-navigation validation for runtime params is not needed here.
export const instant = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date, images: [{ url: `${post.cover.src}?w=1200&q=75` }] },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => (b.category === post.category) - (a.category === post.category))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${post.cover.src}?w=1200&q=75`,
    author: { "@type": "Organization", name: "OneColor" },
    publisher: { "@type": "Organization", name: "OneColor", url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article className={styles.article}>
        <header className={`container ${styles.head}`}>
          <Link href="/blog" className={styles.back}>
            <PiArrowLeft aria-hidden="true" /> The colour journal
          </Link>
          <div className={styles.headGrid}>
            <div className={styles.headCopy}>
              <p className={styles.meta}>
                <span className={styles.cat}>{post.category}</span>
                <span>
                  {post.read} min read · <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
              </p>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.excerpt}>{post.excerpt}</p>
            </div>
            <div className={styles.cover}>
              <Image src={post.cover.src} alt={post.cover.alt} fill preload loading="eager" sizes="(min-width: 900px) 40vw, 90vw" />
            </div>
          </div>
        </header>

        <div className={`container ${styles.bodyGrid}`}>
          <div className={styles.body}>
            {post.body.map((s, i) => (
              <section key={s.h} className={styles.block}>
                <h2>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                <p>{s.p}</p>
              </section>
            ))}
            <p className={styles.disclaimer}>This guide is general information, not medical advice. Always patch test 48 hours before colouring.</p>
          </div>

          <aside className={styles.aside} aria-label="Shop the shades">
            <div className={styles.shop}>
              <p className="eyebrow">Shop the shades</p>
              <p className={styles.shopTitle}>Five shades, one click.</p>
              <ul className={styles.shades}>
                {LAUNCH_SHADES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/products/${s.slug}`} style={{ "--hex": s.hex, "--glow": s.glow }}>
                      <span className={styles.dot} aria-hidden="true" />
                      <span className={styles.code}>{s.code}</span>
                      <span className={styles.name}>{s.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/shop?category=hair-colour" className={styles.shopBtn}>
                Shop all shades <PiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <section className={`section ${styles.related}`} aria-labelledby="related-title">
        <div className="container">
          <h2 id="related-title" className={styles.relatedTitle}>
            Keep <em>reading.</em>
          </h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
