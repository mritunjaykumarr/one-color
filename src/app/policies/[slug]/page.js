import Link from "next/link";
import { notFound } from "next/navigation";
import { PiArrowRight } from "react-icons/pi";
import { POLICIES, SITE } from "../../../../data/content";
import { formatDate } from "../../../../lib/format";
import styles from "./page.module.scss";

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Every valid slug is prerendered via generateStaticParams; unknown slugs 404 at request time,
// so instant-navigation validation for runtime params is not needed here.
export const instant = false;

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const policy = Object.hasOwn(POLICIES, slug) ? POLICIES[slug] : null;
  if (!policy) return { title: "Policy not found" };
  return { title: policy.title, description: policy.intro, alternates: { canonical: `/policies/${slug}` } };
}

export default async function PolicyPage({ params }) {
  const { slug } = await params;
  const policy = Object.hasOwn(POLICIES, slug) ? POLICIES[slug] : null;
  if (!policy) notFound();

  return (
    <div className={styles.page}>
      <header className={`container ${styles.head}`}>
        <p className="eyebrow">Policies</p>
        <h1 className={styles.title}>{policy.title}</h1>
        <p className={styles.intro}>{policy.intro}</p>
        <p className={styles.updated}>
          Last updated <time dateTime={policy.updated}>{formatDate(policy.updated)}</time>
        </p>
      </header>

      <div className={`container ${styles.grid}`}>
        <nav className={styles.toc} aria-label="On this page">
          <div className={styles.tocInner}>
            <p className={styles.tocHead}>On this page</p>
            <ol>
              {policy.sections.map((s) => (
                <li key={s.h}>
                  <a href={`#${slugify(s.h)}`}>{s.h}</a>
                </li>
              ))}
            </ol>
            <div className={styles.other}>
              {Object.entries(POLICIES)
                .filter(([k]) => k !== slug)
                .map(([k, p]) => (
                  <Link key={k} href={`/policies/${k}`}>
                    {p.title} <PiArrowRight aria-hidden="true" />
                  </Link>
                ))}
            </div>
          </div>
        </nav>

        <div className={styles.body}>
          {policy.sections.map((s, i) => (
            <section key={s.h} id={slugify(s.h)} className={styles.block}>
              <h2>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                {s.h}
              </h2>
              {s.p.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </section>
          ))}
          <div className={styles.help}>
            <p className={styles.helpTitle}>Still have a question?</p>
            <p>
              Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or <Link href="/contact">contact support</Link>. We reply within one working day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
