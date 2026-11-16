import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../lib/format";
import styles from "./PostCard.module.scss";

/* size: lg (feature) | md (grid) | row (compact horizontal) */
export default function PostCard({ post, size = "md" }) {
  return (
    <article className={`${styles.card} ${styles[size]}`}>
      <Link href={`/blog/${post.slug}`} className={styles.link}>
        <span className={styles.media}>
          <Image src={post.cover.src} alt={post.cover.alt} fill sizes={size === "lg" ? "(min-width: 900px) 50vw, 100vw" : size === "row" ? "180px" : "(min-width: 900px) 33vw, 100vw"} />
        </span>
        <span className={styles.body}>
          <span className={styles.meta}>
            <span className={styles.cat}>{post.category}</span>
            <span>
              {post.read} min read · <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </span>
          <span className={styles.title}>{post.title}</span>
          {size !== "row" ? <span className={styles.excerpt}>{post.excerpt}</span> : null}
        </span>
      </Link>
    </article>
  );
}
