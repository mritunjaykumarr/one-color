import localFont from "next/font/local";

// Display: Zodiak (Fontshare, ITF Free Font License) — a high-contrast Didone with beauty-editorial poise.
export const zodiak = localFont({
  src: [
    { path: "../assets/fonts/Zodiak-300.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/Zodiak-300i.woff2", weight: "300", style: "italic" },
    { path: "../assets/fonts/Zodiak-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Zodiak-400i.woff2", weight: "400", style: "italic" },
    { path: "../assets/fonts/Zodiak-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

// Body/UI: General Sans (Fontshare) — warm humanist grotesque, highly legible at small mobile sizes.
export const generalSans = localFont({
  src: [
    { path: "../assets/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
