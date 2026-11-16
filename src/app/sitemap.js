import { PRODUCTS } from "../../data/products";
import { POSTS, POLICIES, SITE } from "../../data/content";

export default function sitemap() {
  const base = SITE.url;
  const now = new Date("2026-11-16");
  const statics = ["", "/shop", "/how-it-works", "/reviews", "/blog", "/faq", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "" || p === "/shop" ? "daily" : "weekly",
    priority: p === "" ? 1 : p === "/shop" ? 0.9 : 0.7,
  }));
  const products = PRODUCTS.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p.category === "hair-colour" ? 0.9 : 0.7,
  }));
  const posts = POSTS.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.6 }));
  const policies = Object.keys(POLICIES).map((k) => ({ url: `${base}/policies/${k}`, lastModified: now, changeFrequency: "yearly", priority: 0.3 }));
  return [...statics, ...products, ...posts, ...policies];
}
