"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { PiMinus, PiPlus, PiTruck, PiArrowsCounterClockwise, PiHandCoins, PiLockSimple, PiCheckBold } from "react-icons/pi";
import Stars from "../ui/Stars";
import BenefitIcon from "./BenefitIcon";
import PincodeCheck from "./PincodeCheck";
import { useCart } from "../cart/CartProvider";
import { inr } from "../../lib/format";
import { BENEFITS } from "../../data/products";
import styles from "./BuyBox.module.scss";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

export default function BuyBox({ product, shades, atcRef }) {
  const p = product;
  const isShade = p.category === "hair-colour";
  const soon = p.status === "coming-soon";
  const reduce = useReducedMotion();
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [kitShade, setKitShade] = useState(p.choosesShade ? shades[0].slug : null);
  const [added, setAdded] = useState(false);
  const save = p.mrp - p.price;

  function addToBag(buyNow = false) {
    add(p.slug, { qty, shade: kitShade, openDrawer: buyNow });
    if (!buyNow) {
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1800);
    } else setOpen(true);
  }

  return (
    <div className={styles.box}>
      <nav aria-label="Breadcrumb" className={styles.crumbs}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/shop?category=${p.category}`}>{isShade ? "Hair colour" : "Shop"}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{isShade ? p.name : p.title}</span>
      </nav>

      <div className={styles.titleBlock}>
        {isShade ? <p className={styles.code}>Shade {p.code} · {p.tone} tone</p> : <p className={styles.code}>{p.size}</p>}
        <h1 className={styles.title}>{isShade ? p.name : p.title}</h1>
        <p className={styles.tagline}>{p.tagline}</p>
        {p.reviews > 0 ? (
          <a href="#reviews" className={styles.rating}>
            <Stars value={p.rating} size={14} />
            <span className="tnum">
              <strong>{p.rating}</strong> · {p.reviews} reviews
            </span>
          </a>
        ) : (
          <p className={styles.newTag}>New shade · be among the first to try it</p>
        )}
      </div>

      {/* price */}
      <div className={styles.price}>
        <div className={styles.priceRow}>
          <span className={`${styles.now} tnum`}>{inr(p.price)}</span>
          <span className={styles.mrp}>
            MRP <s className="tnum">{inr(p.mrp)}</s>
          </span>
          <span className={styles.off}>{p.discount}% off</span>
        </div>
        <p className={styles.saveLine}>
          You save <strong className="tnum">{inr(save)}</strong> · Inclusive of all taxes
        </p>
        <p className={styles.upi}>Extra 5% off when you pay by UPI</p>
      </div>

      {/* shade switcher (navigates between shade pages) */}
      {isShade ? (
        <div className={styles.group}>
          <div className={styles.groupHead}>
            <span className={styles.label}>Shade</span>
            <span className={styles.value}>
              {p.code} {p.name}
            </span>
          </div>
          <LayoutGroup id="pdp-shades">
            <div className={styles.swatches}>
              {shades.map((s) => {
                const on = s.slug === p.slug;
                return (
                  <Link
                    key={s.slug}
                    href={`/products/${s.slug}`}
                    scroll={false}
                    className={`${styles.sw} ${on ? styles.swOn : ""} ${s.status === "coming-soon" ? styles.swSoon : ""}`}
                    aria-label={`${s.code} ${s.name}${s.status === "coming-soon" ? " (coming soon)" : ""}`}
                    aria-current={on ? "true" : undefined}
                    title={`${s.code} ${s.name}`}
                  >
                    {on ? <motion.span layoutId="pdp-ring" className={styles.ring} transition={{ duration: reduce ? 0 : 0.45, ease: [0.65, 0, 0.25, 1] }} /> : null}
                    <span className={styles.dot} style={{ background: `radial-gradient(circle at 35% 30%, ${s.glow}, ${s.hex} 72%)` }} />
                  </Link>
                );
              })}
            </div>
          </LayoutGroup>
          <Link href="/shop?category=hair-colour" className={styles.compare}>
            Compare all shades
          </Link>
        </div>
      ) : null}

      {/* kit shade chooser */}
      {p.choosesShade ? (
        <div className={styles.group}>
          <div className={styles.groupHead}>
            <span className={styles.label}>Choose your shade</span>
            <span className={styles.value}>{shades.find((s) => s.slug === kitShade)?.name}</span>
          </div>
          <div className={styles.kitShades} role="radiogroup" aria-label="Shade for this kit">
            {shades
              .filter((s) => s.status === "in-stock")
              .map((s) => (
                <button key={s.slug} type="button" role="radio" aria-checked={kitShade === s.slug} className={`${styles.kitShade} ${kitShade === s.slug ? styles.kitOn : ""}`} onClick={() => setKitShade(s.slug)}>
                  <span className={styles.dotSm} style={{ background: `radial-gradient(circle at 35% 30%, ${s.glow}, ${s.hex} 72%)` }} />
                  {s.code}
                </button>
              ))}
          </div>
        </div>
      ) : null}

      {/* actions */}
      {soon ? (
        <NotifyForm product={p} />
      ) : (
        <div className={styles.actions} ref={atcRef}>
          <div className={styles.qty} aria-label="Quantity">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" disabled={qty <= 1}>
              <PiMinus />
            </button>
            <span className="tnum" aria-live="polite">
              {qty}
            </span>
            <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity" disabled={qty >= 10}>
              <PiPlus />
            </button>
          </div>
          <button type="button" className={styles.add} onClick={() => addToBag(false)}>
            <span className={`${styles.roll} ${added ? styles.rolled : ""}`}>
              <span>Add to bag · {inr(p.price * qty)}</span>
              <span>
                <PiCheckBold aria-hidden="true" /> Added
              </span>
            </span>
          </button>
          <button type="button" className={styles.buy} onClick={() => addToBag(true)}>
            Buy now
          </button>
        </div>
      )}

      {/* what you get */}
      <div className={styles.box2}>
        <p className={styles.label}>What&apos;s in the box</p>
        <ul className={styles.inBox}>
          {p.inBox.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      {/* benefits */}
      {isShade ? (
        <ul className={styles.benefits}>
          {BENEFITS.map((b) => (
            <li key={b.key}>
              <BenefitIcon name={b.key} />
              <span>
                {b.label}
                {b.pending ? "*" : ""}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* delivery */}
      <div className={styles.delivery}>
        <PincodeCheck />
        <ul className={styles.trust}>
          <li>
            <PiTruck aria-hidden="true" /> Free delivery over ₹999
          </li>
          <li>
            <PiHandCoins aria-hidden="true" /> Cash on delivery
          </li>
          <li>
            <PiArrowsCounterClockwise aria-hidden="true" /> 7-day easy returns
          </li>
          <li>
            <PiLockSimple aria-hidden="true" /> Secure payments
          </li>
        </ul>
      </div>
    </div>
  );
}

function NotifyForm({ product }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = email.trim().toLowerCase();
    if (!EMAIL_RE.test(v)) {
      setState("error");
      setMsg("Please enter a valid email.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v, source: "notify", product: product.slug, company: fd.get("company") || "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("done");
      setMsg(`We'll email you the moment ${product.name} launches.`);
    } catch (err) {
      setState("error");
      setMsg(err.message);
    }
  }

  return (
    <form id="notify" className={styles.notify} onSubmit={submit} noValidate>
      <p className={styles.notifyTitle}>Launching soon. Get first access.</p>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className={styles.hp} aria-hidden="true" />
      <label htmlFor="notify-email" className="sr-only">
        Email
      </label>
      <div className={styles.notifyRow}>
        <input id="notify-email" type="email" autoComplete="email" maxLength={254} placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={state === "done"} />
        <button type="submit" disabled={state === "sending" || state === "done"}>
          {state === "done" ? "You're on the list" : "Notify me"}
        </button>
      </div>
      <p className={`${styles.notifyMsg} ${state === "error" ? styles.err : ""}`} role="status" aria-live="polite">
        {msg || "One email at launch, plus 10% off. That's it."}
      </p>
    </form>
  );
}
