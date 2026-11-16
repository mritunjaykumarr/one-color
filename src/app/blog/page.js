import PageHero from "../../../components/pages/PageHero";
import BlogIndex from "../../../components/blog/BlogIndex";
import NewsletterForm from "../../../components/layout/NewsletterForm";
import { POSTS } from "../../../data/content";
import styles from "./page.module.scss";

export const metadata = {
  title: "The colour journal: hair colour guides for Indian hair",
  description:
    "Expert guides on grey hair, choosing a shade for Indian skin tones, home vs salon colour, patch tests and making colour last, from the OneColor team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        tone="plain"
        eyebrow="The colour journal"
        title={
          <>
            Honest guides for <em>every grey &amp; shade.</em>
          </>
        }
        lede="Grey at 28, choosing a shade for your skin tone, making colour last through hard water. Short, practical reads from our colour team."
      />
      <section className={styles.list} aria-label="Articles">
        <div className="container">
          <BlogIndex posts={posts} />
        </div>
      </section>
      <section className={`section ${styles.news}`} aria-labelledby="journal-news">
        <div className={`container ${styles.newsInner}`}>
          <div>
            <p className="eyebrow">New guides, monthly</p>
            <h2 id="journal-news" className={styles.newsTitle}>
              Get the journal <em>in your inbox.</em>
            </h2>
          </div>
          <NewsletterForm tone="light" source="blog" />
        </div>
      </section>
    </>
  );
}
