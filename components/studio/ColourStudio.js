"use client";

/*
  The Colour Studio — OneColor's signature interaction.
  Adapted from two MotionSites studies and re-authored for the brand:
   · spotlight reveal (LGPSM): an eased soft spotlight paints the shade onto real hair
     (ease 0.1, radius clamp(…, 32% of stage, 420), gradient stops 0/.4/.6/.75/.88/1)
   · product chrome (Spin Product): notched ticket cards, pulsing hotspots with wipe-open
     callouts, drawn connector lines, sliding selection highlight, idle auto-motion and a
     fly-to-bag arc into the header bag.
  Hair recolouring is computed on-device (lib/hairTint.js) — no extra photography needed.
*/

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { PiHeart, PiHeartFill, PiPlus } from "react-icons/pi";
import Price from "../ui/Price";
import { useCart } from "../cart/CartProvider";
import { loadImage, buildMask, greysPlate, shadePlate } from "../../lib/hairTint";
import styles from "./ColourStudio.module.scss";
import FlashText from "../ui/FlashText";

const STUDIO_SOURCES = {
  "burgundy-wine": {
    src: "/assets/model-7.jpg",
    alt: "Model with lustrous burgundy-wine hair and plum tones",
    polygon: [
      [0.25, 0.08], [0.55, 0.08], [0.75, 0.14], [0.88, 0.35], [0.92, 0.65],
      [0.85, 0.95], [0.65, 1], [0.15, 1], [0.08, 0.75], [0.06, 0.45], [0.15, 0.22]
    ],
    exclude: [{ cx: 0.48, cy: 0.36, rx: 0.12, ry: 0.15 }],
    focus: { x: 0.52, y: 0.42 },
  },
  "natural-black": {
    src: "/assets/model-3.jpg",
    alt: "Model with glossy high ponytail and natural-black hair",
    polygon: [[0.2, 0.04], [0.8, 0.04], [0.88, 0.35], [0.82, 0.75], [0.18, 0.75], [0.12, 0.35]],
    exclude: [{ cx: 0.5, cy: 0.33, rx: 0.14, ry: 0.17 }],
    focus: { x: 0.5, y: 0.35 },
  },
  "espresso-dark-brown": {
    src: "/assets/model-6.jpg",
    alt: "Model with deep espresso wavy bob hair",
    polygon: [[0.15, 0.08], [0.85, 0.08], [0.92, 0.42], [0.8, 0.65], [0.2, 0.65], [0.08, 0.42]],
    exclude: [{ cx: 0.5, cy: 0.34, rx: 0.14, ry: 0.17 }],
    focus: { x: 0.5, y: 0.32 },
  },
  "chestnut-brown": {
    src: "/assets/model-1.jpg",
    alt: "Model with luminous wavy chestnut-brown hair",
    polygon: [[0.15, 0.05], [0.85, 0.05], [0.92, 0.35], [0.9, 0.85], [0.1, 0.85], [0.08, 0.35]],
    exclude: [{ cx: 0.54, cy: 0.28, rx: 0.12, ry: 0.16 }],
    focus: { x: 0.48, y: 0.35 },
  },
  "mahogany": {
    src: "/assets/model-9.jpg",
    alt: "Model with warm mahogany-copper hair in sunset light",
    polygon: [[0.18, 0.08], [0.82, 0.08], [0.92, 0.45], [0.88, 0.85], [0.12, 0.85], [0.08, 0.45]],
    exclude: [{ cx: 0.5, cy: 0.4, rx: 0.14, ry: 0.18 }],
    focus: { x: 0.5, y: 0.36 },
  },
};

const DEFAULT_SOURCE = STUDIO_SOURCES["burgundy-wine"];

const HOTSPOTS = [
  { id: "roots", x: 0.52, y: 0.16, title: "Roots", body: "Full grey coverage at the parting, where greys show first." },
  { id: "lengths", x: 0.68, y: 0.48, title: "Lengths", body: "Even colour from root to tip, with no dark bands or patchy overlaps." },
  { id: "ends", x: 0.76, y: 0.8, title: "Ends", body: "Shine sealed in by the colour-lock conditioner in every box." },
];

const DETAILS = (s) => [
  { k: "On greys", v: s.coverage === "full" ? "Covers 100% of greys in one application, including stubborn temples." : "Blends early greys into soft, natural highlights." },
  { k: "Tone", v: `${s.tone[0].toUpperCase()}${s.tone.slice(1)}. ${s.tagline}` },
  { k: "Best for", v: s.bestFor },
  { k: "Lasts", v: "Permanent: it grows out, it doesn't wash out. Touch up roots every 4–6 weeks." },
];

const EASE = [0.16, 1, 0.3, 1];

export default function ColourStudio({ shades, initial = 4, compact = false }) {
  const reduce = useReducedMotion();
  const { add } = useCart();
  const uid = useId().replace(/[:]/g, "");

  const [idx, setIdx] = useState(initial);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState("paint"); // paint | before | after
  const [open, setOpen] = useState(0);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const [tip, setTip] = useState(null);
  const shade = shades[idx];
  const source = STUDIO_SOURCES[shade?.slug] || DEFAULT_SOURCE;

  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const buyRef = useRef(null);
  const sectionRef = useRef(null);
  const st = useRef({
    cache: {}, mask: null, before: null, plates: {}, after: null, off: null,
    mouse: { x: 0, y: 0 }, smooth: { x: 0, y: 0 }, radius: 0, radiusTarget: 0,
    lastMove: 0, t0: 0, visible: false, raf: 0, dpr: 1, w: 0, h: 0,
  });
  const [geom, setGeom] = useState({ ox: 0, oy: 0, sw: 0, sh: 0, W: 0, H: 0 });

  /* —— geometry: cover-fit the plate into the stage —— */
  const measure = useCallback(() => {
    const s = st.current;
    const el = stageRef.current;
    const cv = canvasRef.current;
    if (!el || !cv || !s.mask) return;
    const W = el.clientWidth;
    const H = el.clientHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    s.dpr = dpr;
    s.w = W;
    s.h = H;
    const scale = Math.max(W / s.mask.w, H / s.mask.h);
    const sw = s.mask.w * scale;
    const sh = s.mask.h * scale;
    const ox = (W - sw) / 2;
    const oy = (H - sh) * 0.22; // keep the head in frame
    setGeom({ ox, oy, sw, sh, W, H });
    s.geom = { ox, oy, sw, sh };
    s.radiusTarget = Math.round(Math.min(420, Math.max(110, W * 0.32)));
    if (!s.t0) {
      s.mouse = { x: ox + source.focus.x * sw, y: oy + source.focus.y * sh };
      s.smooth = { ...s.mouse };
    }
    if (!s.off) s.off = document.createElement("canvas");
    s.off.width = cv.width;
    s.off.height = cv.height;
  }, [source]);

  /* —— build plates for active shade model —— */
  useEffect(() => {
    let alive = true;
    (async () => {
      const s = st.current;
      const slug = shade.slug;
      if (!s.cache) s.cache = {};
      if (s.cache[slug]) {
        s.mask = s.cache[slug].mask;
        s.before = s.cache[slug].before;
        s.after = s.cache[slug].after;
        s.radius = Math.min(s.radius, 40);
        setReady(true);
        measure();
        return;
      }
      try {
        let img;
        try {
          img = await loadImage(`/_next/image?url=${encodeURIComponent(source.src)}&w=1080&q=75`);
        } catch {
          img = await loadImage(source.src);
        }
        if (!alive) return;
        const mask = buildMask(img, source);
        const before = greysPlate(mask);
        const after = shadePlate(mask, shade.hex, shade.glow);
        s.cache[slug] = { mask, before, after };
        s.mask = mask;
        s.before = before;
        s.after = after;
        s.radius = Math.min(s.radius, 40);
        setReady(true);
        measure();
      } catch {
        /* image failed — the static fallback photo stays visible */
      }
    })();
    return () => {
      alive = false;
    };
  }, [shade, source, measure]);

  useEffect(() => {
    if (!ready) return undefined;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [ready, measure]);

  /* —— render loop (only while on screen) —— */
  useEffect(() => {
    if (!ready) return undefined;
    const s = st.current;
    const cv = canvasRef.current;
    const ctx = cv.getContext("2d");

    const frame = (now) => {
      s.raf = 0;
      if (!s.visible || !s.geom || !s.after) return;
      if (!s.t0) s.t0 = now;
      const { ox, oy, sw, sh } = s.geom;

      // idle: after 2.5s without input, the spotlight drifts over the hair on its own
      const idle = now - s.lastMove > 2500;
      if (idle && !reduce && mode === "paint") {
        const t = (now - s.t0) / 1000;
        s.mouse.x = ox + (source.focus.x + Math.sin(t * 0.55) * 0.16) * sw;
        s.mouse.y = oy + (source.focus.y + Math.sin(t * 0.37 + 1.3) * 0.3) * sh;
      }
      s.smooth.x += (s.mouse.x - s.smooth.x) * 0.1;
      s.smooth.y += (s.mouse.y - s.smooth.y) * 0.1;
      const target = mode === "after" ? Math.hypot(s.w, s.h) : mode === "before" ? 0 : s.radiusTarget;
      s.radius += (target - s.radius) * (mode === "paint" ? 0.08 : 0.06);

      const d = s.dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(s.before, ox * d, oy * d, sw * d, sh * d);

      if (s.radius > 1) {
        const o = s.off.getContext("2d");
        o.globalCompositeOperation = "source-over";
        o.clearRect(0, 0, s.off.width, s.off.height);
        o.drawImage(s.after, ox * d, oy * d, sw * d, sh * d);
        o.globalCompositeOperation = "destination-in";
        const cx = s.smooth.x * d;
        const cy = s.smooth.y * d;
        const r = s.radius * d;
        const g = o.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.4, "rgba(255,255,255,1)");
        g.addColorStop(0.6, "rgba(255,255,255,0.75)");
        g.addColorStop(0.75, "rgba(255,255,255,0.4)");
        g.addColorStop(0.88, "rgba(255,255,255,0.12)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        o.fillStyle = g;
        o.fillRect(0, 0, s.off.width, s.off.height);
        ctx.drawImage(s.off, 0, 0);
      }
      s.raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      s.visible = e.isIntersecting;
      if (s.visible && !s.raf) s.raf = requestAnimationFrame(frame);
    });
    io.observe(cv);
    return () => {
      io.disconnect();
      cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [ready, mode, reduce]);

  function onPointer(e) {
    const r = stageRef.current.getBoundingClientRect();
    const s = st.current;
    s.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    s.lastMove = performance.now();
    if (mode !== "paint") setMode("paint");
  }

  function choose(i) {
    setIdx(i);
    setAdded(false);
  }

  function addToBag() {
    if (shade.status !== "in-stock") return;
    add(shade.slug, { openDrawer: false });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
    flyToBag();
  }

  function flyToBag() {
    const from = buyRef.current?.getBoundingClientRect();
    const bag = document.getElementById("header-bag")?.getBoundingClientRect();
    if (!from || !bag || reduce) return;
    const dot = document.createElement("span");
    dot.className = styles.flyer;
    dot.style.background = `radial-gradient(circle at 35% 30%, ${shade.glow}, ${shade.hex} 72%)`;
    document.body.appendChild(dot);
    const x0 = from.left + from.width / 2 - 24;
    const y0 = from.top + from.height / 2 - 24;
    const x1 = bag.left + bag.width / 2 - 24;
    const y1 = bag.top + bag.height / 2 - 24;
    const mx = x0 + (x1 - x0) * 0.5;
    const my = Math.min(y0, y1) - 140;
    dot.animate(
      [
        { transform: `translate(${x0}px, ${y0}px) scale(1)`, opacity: 1 },
        { transform: `translate(${mx}px, ${my}px) scale(0.8) rotate(-8deg)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${x1}px, ${y1}px) scale(0.22) rotate(-14deg)`, opacity: 0.9 },
      ],
      { duration: 900, easing: "cubic-bezier(.5,0,.3,1)", fill: "forwards" }
    );
    window.setTimeout(() => dot.remove(), 950);
  }

  const toStage = (p) => ({ left: geom.ox + p.x * geom.sw, top: geom.oy + p.y * geom.sh });
  const visibleSpot = (p) => {
    const { left, top } = toStage(p);
    return left > 12 && left < geom.W - 12 && top > 12 && top < geom.H - 12;
  };

  return (
    <section ref={sectionRef} className={`${styles.studio} ${compact ? styles.compact : ""}`} style={{ "--hex": shade.hex, "--glow": shade.glow, "--tint": shade.tint }} aria-labelledby={`studio-${uid}`}>
      <div className={`container ${styles.head}`}>
        <div>
          <p className="eyebrow">The colour studio</p>
          <FlashText as="h2" id={`studio-${uid}`} className={styles.title}>
            Try every shade <em>on real hair.</em>
          </FlashText>
        </div>
        <p className={styles.headNote}>Move across the photo to paint the colour in. Pick a shade to swap it. Greys shown are simulated.</p>
      </div>

      <div className={`container ${styles.grid}`}>
        {/* ——— info ticket ——— */}
        <aside className={`${styles.ticket} ${styles.info}`}>
          <div className={styles.ticketInner}>
            <p className={styles.spec}>Shade {shade.code}</p>
            <p className={styles.shadeName}>{shade.name}</p>
            <div className={styles.row}>
              <Price price={shade.price} mrp={shade.mrp} size="sm" />
              <span className={styles.tag}>{shade.status === "in-stock" ? "In stock" : "Coming soon"}</span>
            </div>
            <div className={styles.acc}>
              {DETAILS(shade).map((d, i) => (
                <div key={d.k} className={`${styles.accItem} ${open === i ? styles.accOpen : ""}`}>
                  <button type="button" className={styles.accHead} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                    <span>{d.k}</span>
                    <span aria-hidden="true">[{open === i ? "−" : "+"}]</span>
                  </button>
                  <div className={styles.accBody}>
                    <p>{d.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ——— stage ——— */}
        <div className={styles.stageCol}>
          <div
            ref={stageRef}
            className={`${styles.stage} ${ready ? styles.live : ""}`}
            onPointerMove={onPointer}
            onPointerDown={onPointer}
            role="img"
            aria-label={`${source.alt}, shown with simulated greys; the ${shade.name} shade is painted in where you point.`}
          >
            {/* static fallback before JS/plates are ready */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={source.src} className={styles.fallback} src={source.src} alt={source.alt} aria-hidden="true" />
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

            {ready
              ? HOTSPOTS.filter(visibleSpot).map((h, i) => {
                  const pos = toStage(h);
                  const right = h.x < 0.62;
                  return (
                    <div key={h.id} className={styles.hs} style={{ left: pos.left, top: pos.top, "--d": `${0.2 + i * 0.08}s` }}>
                      <button
                        type="button"
                        className={styles.pin}
                        aria-label={`${h.title}: ${h.body}`}
                        aria-expanded={tip === h.id}
                        onMouseEnter={() => setTip(h.id)}
                        onMouseLeave={() => setTip(null)}
                        onFocus={() => setTip(h.id)}
                        onBlur={() => setTip(null)}
                        onClick={() => setTip(tip === h.id ? null : h.id)}
                      >
                        <PiPlus aria-hidden="true" />
                      </button>
                      <div className={`${styles.tip} ${right ? styles.tipR : styles.tipL} ${tip === h.id ? styles.tipOn : ""}`} aria-hidden="true">
                        <strong>{h.title}</strong>
                        {h.body}
                      </div>
                    </div>
                  );
                })
              : null}

            <div className={styles.readout} aria-hidden="true">
              <span>{mode === "paint" ? "Move to colour" : mode === "after" ? "Full colour" : "Before"}</span>
              <span className={styles.bar}>
                <span style={{ left: mode === "before" ? "0%" : mode === "after" ? "100%" : "50%" }} />
              </span>
              <span className={styles.code}>{shade.code}</span>
            </div>
          </div>

          <div className={styles.modes} role="radiogroup" aria-label="View">
            {[
              ["before", "Before"],
              ["paint", "Paint"],
              ["after", "After"],
            ].map(([m, label]) => (
              <button key={m} type="button" role="radio" aria-checked={mode === m} className={mode === m ? styles.modeOn : ""} onClick={() => setMode(m)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ——— buy ticket ——— */}
        <aside className={`${styles.ticket} ${styles.buy}`}>
          <div className={styles.ticketInner}>
            <p className={styles.spec}>Shade</p>
            <LayoutGroup id={`studio-sw-${uid}`}>
              <div className={styles.swatches} role="radiogroup" aria-label="Choose shade">
                {shades.map((s, i) => (
                  <button key={s.slug} type="button" role="radio" aria-checked={i === idx} aria-label={`${s.code} ${s.name}`} className={styles.sw} onClick={() => choose(i)}>
                    {i === idx ? <motion.span layoutId={`hl-${uid}`} className={styles.hl} transition={{ duration: reduce ? 0 : 0.45, ease: [0.65, 0, 0.25, 1] }} /> : null}
                    <span className={styles.swDot} style={{ background: `radial-gradient(circle at 35% 30%, ${s.glow}, ${s.hex} 72%)` }} />
                    <span className={styles.swCode}>{s.code}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <p className={styles.note}>
              {shade.coverage === "full" ? "Full grey coverage" : "Grey blending"} · 2–4 applications per bottle* · <a href={`/products/${shade.slug}`}>Shade details</a>
            </p>
            <div className={styles.actions}>
              <button type="button" className={`${styles.save} ${saved ? styles.saved : ""}`} aria-pressed={saved} onClick={() => setSaved((v) => !v)} aria-label={saved ? "Saved" : "Save shade"}>
                {saved ? <PiHeartFill aria-hidden="true" /> : <PiHeart aria-hidden="true" />}
              </button>
              <button ref={buyRef} type="button" className={styles.add} onClick={addToBag} disabled={shade.status !== "in-stock"}>
                <span className={`${styles.roll} ${added ? styles.rolled : ""}`}>
                  <span>{shade.status === "in-stock" ? "Add to bag" : "Coming soon"}</span>
                  <span>Added to bag</span>
                </span>
              </button>
            </div>
            <p className={styles.fine}>COD available · Free delivery over ₹999 · Extra 5% off on UPI</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
