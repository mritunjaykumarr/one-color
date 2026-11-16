"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiMagnifyingGlass, PiHandbagSimple, PiList, PiX, PiCaretDown, PiArrowRight, PiWhatsappLogo } from "react-icons/pi";
import Logo from "../brand/Logo";
import { useCart } from "../cart/CartProvider";
import { useUI } from "./UIProvider";
import { SHOP_MENU, MAIN_NAV } from "../../data/navigation";
import { IMG } from "../../data/media";
import { SITE } from "../../data/content";
import styles from "./Header.module.scss";

const EASE = [0.16, 1, 0.3, 1];

export default function Header() {
  const pathname = usePathname();
  const { count, setOpen, bump } = useCart();
  const { setFinderOpen, setSearchOpen } = useUI();
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const reduce = useReducedMotion();

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMega(false);
    setDrawer(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawer) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawer]);

  useEffect(() => {
    if (!mega) return undefined;
    const onKey = (e) => e.key === "Escape" && setMega(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMegaSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 140);
  };

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`${styles.header} ${scrolled || mega ? styles.solid : ""}`}>
      <div className={`container ${styles.row}`}>
        <button type="button" className={`${styles.iconBtn} ${styles.burger}`} aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}>
          <PiList />
        </button>

        <Link href="/" className={styles.brand} aria-label="OneColor home">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <div className={styles.shopWrap} onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
            <button
              type="button"
              className={`${styles.navLink} ${mega || isActive("/shop") || isActive("/products") ? styles.active : ""}`}
              aria-expanded={mega}
              aria-controls="mega-shop"
              onClick={() => setMega((m) => !m)}
            >
              Shop <PiCaretDown className={`${styles.caret} ${mega ? styles.caretUp : ""}`} aria-hidden="true" />
            </button>
          </div>
          {MAIN_NAV.map((l) => (
            <Link key={l.href} href={l.href} className={`${styles.navLink} ${isActive(l.href) ? styles.active : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.finder} onClick={() => setFinderOpen(true)}>
            <span className={styles.finderDot} aria-hidden="true" />
            Find your shade
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Search products" onClick={() => setSearchOpen(true)}>
            <PiMagnifyingGlass />
          </button>
          <button id="header-bag" type="button" className={styles.iconBtn} aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`} onClick={() => setOpen(true)}>
            <motion.span
              key={bump}
              className={styles.bagIcon}
              initial={reduce || bump === 0 ? false : { scale: 0.7, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <PiHandbagSimple />
            </motion.span>
            {count > 0 ? <span className={`${styles.count} tnum`}>{count}</span> : null}
          </button>
        </div>
      </div>

      {/* ——— Mega menu ——— */}
      <AnimatePresence>
        {mega ? (
          <motion.div
            id="mega-shop"
            className={styles.mega}
            onMouseEnter={openMega}
            onMouseLeave={closeMegaSoon}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className={`container ${styles.megaGrid}`}>
              <div className={styles.megaCol}>
                <p className={styles.megaHead}>Shades</p>
                <ul className={styles.shadeList}>
                  {SHOP_MENU.shades.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className={styles.shadeLink}>
                        <span className={styles.swatch} style={{ "--hex": s.hex, "--glow": s.glow }} aria-hidden="true" />
                        <span className={styles.shadeCode}>{s.code}</span>
                        <span className={styles.shadeName}>{s.label}</span>
                        {s.soon ? <span className={styles.soon}>Soon</span> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.megaCol}>
                <p className={styles.megaHead}>Shade family</p>
                <ul className={styles.linkList}>
                  {SHOP_MENU.families.map((f) => (
                    <li key={f.href}>
                      <Link href={f.href}>
                        <span className={styles.famDot} style={{ background: f.hex }} aria-hidden="true" />
                        {f.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className={`${styles.megaHead} ${styles.spaced}`}>Category</p>
                <ul className={styles.linkList}>
                  {SHOP_MENU.categories.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.megaCol}>
                <p className={styles.megaHead}>Shop by need</p>
                <ul className={styles.linkList}>
                  {SHOP_MENU.needs.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
                <p className={`${styles.megaHead} ${styles.spaced}`}>Price</p>
                <ul className={styles.linkList}>
                  {SHOP_MENU.prices.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/products/complete-colour-kit" className={styles.feature}>
                <Image src={IMG.combing.src} alt={IMG.combing.alt} fill sizes="320px" className={styles.featureImg} />
                <span className={styles.featureBody}>
                  <span className={styles.featureKicker}>Best value</span>
                  <span className={styles.featureTitle}>The Complete Colour Kit</span>
                  <span className={styles.featureCta}>
                    ₹2,199 <PiArrowRight aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </div>
            <div className={`container ${styles.megaFoot}`}>
              <Link href="/shop" className={styles.shopAll}>
                Shop all products <PiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ——— Mobile drawer ——— */}
      <AnimatePresence>
        {drawer ? (
          <>
            <motion.div className={styles.scrim} onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside
              className={styles.drawer}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduce ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className={styles.drawerTop}>
                <Logo />
                <button type="button" className={styles.iconBtn} aria-label="Close menu" onClick={() => setDrawer(false)}>
                  <PiX />
                </button>
              </div>
              <div className={styles.drawerScroll}>
                <p className={styles.megaHead}>Shades</p>
                <div className={styles.drawerShades}>
                  {SHOP_MENU.shades.map((s) => (
                    <Link key={s.href} href={s.href} className={styles.drawerShade}>
                      <span className={styles.swatchLg} style={{ "--hex": s.hex, "--glow": s.glow }} aria-hidden="true" />
                      <span className={styles.drawerShadeName}>{s.label}</span>
                      <span className={styles.drawerShadeCode}>{s.soon ? "Soon" : s.code}</span>
                    </Link>
                  ))}
                </div>
                <nav className={styles.drawerNav} aria-label="Mobile">
                  <Link href="/shop">Shop all</Link>
                  {SHOP_MENU.categories.map((c) => (
                    <Link key={c.href} href={c.href} className={styles.sub}>
                      {c.label}
                    </Link>
                  ))}
                  {MAIN_NAV.map((l) => (
                    <Link key={l.href} href={l.href}>
                      {l.label}
                    </Link>
                  ))}
                  <Link href="/faq">FAQ</Link>
                  <Link href="/contact">Support</Link>
                </nav>
              </div>
              <div className={styles.drawerFoot}>
                <button
                  type="button"
                  className={styles.drawerCta}
                  onClick={() => {
                    setDrawer(false);
                    setFinderOpen(true);
                  }}
                >
                  Find your shade in 3 taps
                </button>
                <a className={styles.drawerWa} href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <PiWhatsappLogo aria-hidden="true" /> Ask a colour expert
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
