import { zodiak, generalSans } from "../../lib/fonts";
import { CartProvider } from "../../components/cart/CartProvider";
import { UIProvider } from "../../components/layout/UIProvider";
import AnnouncementBar from "../../components/layout/AnnouncementBar";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CartDrawer from "../../components/cart/CartDrawer";
import SearchOverlay from "../../components/layout/SearchOverlay";
import ShadeFinder from "../../components/layout/ShadeFinder";
import { SITE } from "../../data/content";
import "./globals.scss";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "OneColor | One-click permanent hair colour, made for India",
    template: "%s | OneColor",
  },
  description:
    "Salon-rich permanent hair colour in a one-click bottle: colour and developer mix 1:1 inside, with no bowls, no mess and no waste. Five shades for Indian hair, with 100% grey coverage.",
  keywords: ["hair colour", "permanent hair colour India", "grey coverage", "ammonia-free hair colour", "burgundy hair colour", "OneColor"],
  openGraph: {
    type: "website",
    siteName: "OneColor",
    locale: "en_IN",
    title: "OneColor | One click. Your colour.",
    description: "Permanent hair colour in a one-click bottle. No mixing, no mess, no waste.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#fbf3ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${zodiak.variable} ${generalSans.variable}`}>
      <body>
        <noscript>
          {/* if JS is unavailable, never leave reveal-animated content hidden */}
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <UIProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
            <ShadeFinder />
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  );
}
