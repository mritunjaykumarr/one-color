import { PRODUCTS, CATEGORIES, FAMILIES, TONES, COVERAGE, PACKS, PRICE_BANDS, SORTS } from "../data/products";

/*
  Catalogue query engine — shared by the shop page, search overlay and nav links.
  All URL params are whitelisted against known ids, so arbitrary input can never
  reach rendering or a query (defence against injection / junk params).
*/

const SYNONYMS = {
  gray: "grey",
  greys: "grey",
  grays: "grey",
  color: "colour",
  colors: "colour",
  dye: "colour",
  dyes: "colour",
  maroon: "burgundy",
  wine: "burgundy",
  red: "red",
  coffee: "espresso",
  kit: "kit",
  kits: "kit",
  glove: "gloves",
  shampoo: "shampoo",
};

const FAMILY_LABEL = Object.fromEntries(FAMILIES.map((f) => [f.id, f.label]));
const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

function haystack(p) {
  return [
    p.title,
    p.name,
    p.code,
    p.tagline,
    p.description,
    CATEGORY_LABEL[p.category],
    p.family ? FAMILY_LABEL[p.family] : "",
    p.tone || "",
    p.coverage === "full" ? "grey coverage greys" : "",
    p.category === "hair-colour" ? "hair colour permanent shade" : "",
    p.size,
    p.badge || "",
  ]
    .join(" ")
    .toLowerCase();
}

const INDEX = PRODUCTS.map((p) => ({ p, text: haystack(p) }));

export function normaliseQuery(q) {
  return String(q || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s.]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

export function searchProducts(q, list = PRODUCTS) {
  const nq = normaliseQuery(q);
  if (!nq) return list;
  const tokens = nq.split(" ").map((t) => SYNONYMS[t] || t);
  const allowed = new Set(list.map((p) => p.slug));
  return INDEX.filter(({ p }) => allowed.has(p.slug))
    .map(({ p, text }) => {
      let score = 0;
      for (const t of tokens) {
        if (!text.includes(t)) return null;
        score += p.name.toLowerCase().includes(t) ? 3 : 1;
        if (p.code && p.code === t) score += 4;
      }
      return { p, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

const ids = (arr) => new Set(arr.map((x) => x.id));
const VALID = {
  category: ids(CATEGORIES),
  family: ids(FAMILIES),
  tone: ids(TONES),
  coverage: ids(COVERAGE),
  pack: ids(PACKS),
  price: ids(PRICE_BANDS),
  sort: ids(SORTS),
};

function list(v, key) {
  if (!v) return [];
  const raw = Array.isArray(v) ? v.join(",") : String(v);
  return [...new Set(raw.split(",").map((s) => s.trim()).filter((s) => VALID[key].has(s)))];
}

function num(v, fallback) {
  const n = parseInt(Array.isArray(v) ? v[0] : v, 10);
  return Number.isFinite(n) && n >= 0 && n <= 100000 ? n : fallback;
}

export const PRICE_FLOOR = 0;
export const PRICE_CEIL = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 500) * 500;

/* Parse URLSearchParams (or a plain object) into a safe filter state */
export function parseFilters(sp) {
  const get = (k) => (typeof sp?.get === "function" ? sp.get(k) : sp?.[k]);
  const min = num(get("min"), PRICE_FLOOR);
  const max = num(get("max"), PRICE_CEIL);
  return {
    q: normaliseQuery(get("q")),
    category: list(get("category"), "category"),
    family: list(get("family"), "family"),
    tone: list(get("tone"), "tone"),
    coverage: list(get("coverage"), "coverage"),
    pack: list(get("pack"), "pack"),
    price: list(get("price"), "price"),
    min: Math.min(min, max),
    max: Math.max(min, max),
    rating: get("rating") === "4" ? 4 : 0,
    instock: get("instock") === "1",
    sale: get("sale") === "1",
    sort: list(get("sort"), "sort")[0] || "featured",
  };
}

export function filtersToQuery(f) {
  const params = new URLSearchParams();
  if (f.q) params.set("q", f.q);
  ["category", "family", "tone", "coverage", "pack", "price"].forEach((k) => {
    if (f[k]?.length) params.set(k, f[k].join(","));
  });
  if (f.min > PRICE_FLOOR) params.set("min", String(f.min));
  if (f.max < PRICE_CEIL) params.set("max", String(f.max));
  if (f.rating) params.set("rating", "4");
  if (f.instock) params.set("instock", "1");
  if (f.sale) params.set("sale", "1");
  if (f.sort && f.sort !== "featured") params.set("sort", f.sort);
  const s = params.toString();
  return s ? `?${s}` : "";
}

export function activeFilterCount(f) {
  return (
    f.category.length +
    f.family.length +
    f.tone.length +
    f.coverage.length +
    f.pack.length +
    f.price.length +
    (f.min > PRICE_FLOOR || f.max < PRICE_CEIL ? 1 : 0) +
    (f.rating ? 1 : 0) +
    (f.instock ? 1 : 0) +
    (f.sale ? 1 : 0)
  );
}

/* Apply all filters except `skip` (used to compute live facet counts) */
export function applyFilters(f, { skip } = {}) {
  let out = f.q ? searchProducts(f.q) : PRODUCTS.slice();
  const shadeOnly = (key) => (p) => p.category === "hair-colour" && f[key].includes(p[key]);

  if (skip !== "category" && f.category.length) out = out.filter((p) => f.category.includes(p.category));
  if (skip !== "family" && f.family.length) out = out.filter(shadeOnly("family"));
  if (skip !== "tone" && f.tone.length) out = out.filter(shadeOnly("tone"));
  if (skip !== "coverage" && f.coverage.length) out = out.filter(shadeOnly("coverage"));
  if (skip !== "pack" && f.pack.length) out = out.filter((p) => f.pack.includes(p.pack));
  if (skip !== "price") {
    if (f.price.length) {
      const bands = PRICE_BANDS.filter((b) => f.price.includes(b.id));
      out = out.filter((p) => bands.some((b) => p.price >= b.min && p.price < b.max));
    }
    out = out.filter((p) => p.price >= f.min && p.price <= f.max);
  }
  if (skip !== "rating" && f.rating) out = out.filter((p) => p.rating >= f.rating);
  if (skip !== "instock" && f.instock) out = out.filter((p) => p.status === "in-stock");
  if (skip !== "sale" && f.sale) out = out.filter((p) => p.discount >= 15);

  return sortProducts(out, f.sort, Boolean(f.q));
}

export function sortProducts(arr, sort, keepRelevance = false) {
  const out = arr.slice();
  switch (sort) {
    case "price-asc":
      return out.sort((a, b) => a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => b.price - a.price);
    case "rating":
      return out.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "discount":
      return out.sort((a, b) => b.discount - a.discount);
    case "new":
      return out.sort((a, b) => (b.badge === "New") - (a.badge === "New") || b.order - a.order);
    default:
      if (keepRelevance) return out;
      return out.sort((a, b) => (a.status === "coming-soon") - (b.status === "coming-soon") || a.order - b.order);
  }
}

export function facetCounts(f) {
  const count = (key, values, match) => {
    const base = applyFilters(f, { skip: key });
    return Object.fromEntries(values.map((v) => [v.id, base.filter((p) => match(p, v)).length]));
  };
  return {
    category: count("category", CATEGORIES, (p, v) => p.category === v.id),
    family: count("family", FAMILIES, (p, v) => p.family === v.id),
    tone: count("tone", TONES, (p, v) => p.category === "hair-colour" && p.tone === v.id),
    coverage: count("coverage", COVERAGE, (p, v) => p.category === "hair-colour" && p.coverage === v.id),
    pack: count("pack", PACKS, (p, v) => p.pack === v.id),
    price: count("price", PRICE_BANDS, (p, v) => p.price >= v.min && p.price < v.max),
  };
}
