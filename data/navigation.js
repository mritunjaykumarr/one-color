import { ALL_SHADES, CATEGORIES, FAMILIES, PRICE_BANDS } from "./products";

export const SHOP_MENU = {
  shades: ALL_SHADES.map((s) => ({
    label: s.name,
    code: s.code,
    hex: s.hex,
    glow: s.glow,
    soon: s.status === "coming-soon",
    href: `/products/${s.slug}`,
  })),
  families: FAMILIES.map((f) => ({ label: f.label, hex: f.hex, href: `/shop?category=hair-colour&family=${f.id}` })),
  categories: CATEGORIES.map((c) => ({ label: c.label, href: `/shop?category=${c.id}` })),
  needs: [
    { label: "Full grey coverage", href: "/shop?category=hair-colour&coverage=full" },
    { label: "Warm tones", href: "/shop?category=hair-colour&tone=warm" },
    { label: "Cool tones", href: "/shop?category=hair-colour&tone=cool" },
    { label: "Value packs", href: "/shop?pack=duo,kit" },
  ],
  prices: PRICE_BANDS.map((b) => ({ label: b.label, href: `/shop?price=${b.id}` })),
};

export const MAIN_NAV = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Results", href: "/reviews" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Hair colour", href: "/shop?category=hair-colour" },
      { label: "Kits & bundles", href: "/shop?category=kits" },
      { label: "Aftercare", href: "/shop?category=aftercare" },
      { label: "Tools", href: "/shop?category=tools" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Reviews & results", href: "/reviews" },
      { label: "Journal", href: "/blog" },
      { label: "Shade guide", href: "/blog/choose-your-shade" },
      { label: "Patch test", href: "/blog/patch-test-guide" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact & support", href: "/contact" },
      { label: "Shipping & returns", href: "/policies/shipping-returns" },
      { label: "Track order", href: "/contact#track" },
    ],
  },
  {
    title: "OneColor",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Privacy policy", href: "/policies/privacy" },
      { label: "Terms of use", href: "/policies/terms" },
    ],
  },
];
