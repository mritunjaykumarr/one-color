import BottleBlueprint from "../brand/BottleBlueprint";
import { getProduct } from "../../data/products";
import styles from "./ProductArt.module.scss";

/*
  Spec-sheet packshots for every SKU — hairline technical drawings with a single colour fill,
  matching the BottleBlueprint language. PLACEHOLDERS until client product photography.
*/
export default function ProductArt({ product, state = "clicked", className = "" }) {
  const p = product;
  if (p.art === "bottle") {
    return <BottleBlueprint hex={p.hex} state={state} labels={false} className={className} title={`OneColor ${p.code} ${p.name}, technical drawing`} />;
  }
  if (p.art === "duo" || p.art === "trio" || p.art === "kit") {
    const shades = p.art === "trio" ? ["natural-black", "burgundy-wine", "espresso-dark-brown"] : p.art === "duo" ? ["chestnut-brown", "mahogany"] : ["burgundy-wine"];
    return (
      <div className={`${styles.group} ${styles[p.art]} ${className}`} role="img" aria-label={`${p.name}, technical drawing`}>
        {p.art === "kit" ? (
          <>
            <span className={styles.kitTube}>
              <LineArt kind="tube" hex="#c98a6b" />
            </span>
            <span className={styles.kitTall}>
              <LineArt kind="bottle-tall" hex="#d9a35a" />
            </span>
          </>
        ) : null}
        {shades.map((s, i) => {
          const sp = getProduct(s);
          return (
            <span key={`${s}-${i}`} className={styles.member}>
              <BottleBlueprint hex={sp.hex} state={state} labels={false} title="" />
            </span>
          );
        })}
      </div>
    );
  }
  return (
    <div className={`${styles.single} ${className}`} role="img" aria-label={`${p.name}, technical drawing`}>
      <LineArt kind={p.art} hex={p.hex} />
    </div>
  );
}

function LineArt({ kind, hex }) {
  const ink = { fill: "none", stroke: "var(--c-plum-900)", strokeWidth: 1.6, strokeLinejoin: "round", strokeLinecap: "round" };
  const thin = { ...ink, strokeWidth: 0.8 };
  const fill = { fill: hex, opacity: 0.85 };
  const axis = <line x1="120" y1="18" x2="120" y2="292" stroke="rgba(42,18,21,.22)" strokeWidth="0.8" strokeDasharray="10 4 2 4" />;

  const body = {
    tube: (
      <>
        <path {...fill} d="M86 70 L154 70 L146 248 L94 248 Z" />
        <path {...ink} d="M80 44 L160 44 L148 252 Q147 262 136 262 L104 262 Q93 262 92 252 Z" />
        <path {...thin} d="M80 58 H160" />
        <rect {...ink} x="98" y="262" width="44" height="24" rx="5" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} {...thin} x1={84 + i * 12} y1="44" x2={84 + i * 12} y2="58" />
        ))}
      </>
    ),
    "bottle-tall": (
      <>
        <rect {...fill} x="90" y="110" width="60" height="160" rx="16" />
        <rect {...ink} x="80" y="78" width="80" height="208" rx="26" />
        <rect {...ink} x="104" y="46" width="32" height="32" rx="5" />
        <rect {...ink} x="96" y="30" width="48" height="16" rx="5" />
        <path {...thin} d="M80 120 H160" />
      </>
    ),
    dropper: (
      <>
        <rect {...fill} x="90" y="168" width="60" height="110" rx="14" />
        <rect {...ink} x="82" y="140" width="76" height="148" rx="20" />
        <rect {...ink} x="104" y="104" width="32" height="36" rx="5" />
        <path {...ink} d="M108 104 Q108 44 120 44 Q132 44 132 104" />
        <path {...thin} d="M120 140 V250" />
      </>
    ),
    comb: (
      <g transform="rotate(-24 120 160)">
        <rect {...fill} x="40" y="134" width="160" height="20" rx="6" />
        <rect {...ink} x="36" y="128" width="168" height="30" rx="8" />
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={i} {...thin} x1={44 + i * 6.8} y1="158" x2={44 + i * 6.8} y2={i < 11 ? 196 : 186} />
        ))}
        <path {...ink} d="M204 140 H280" />
      </g>
    ),
    gloves: (
      <>
        {[0, 1].map((k) => (
          <g key={k} transform={`translate(${k * 30 - 14} ${k * 8}) rotate(${k ? 7 : -7} 120 160)`}>
            <path
              {...ink}
              {...(k ? { fill: hex, fillOpacity: 0.85 } : {})}
              d="M88 268 V172 Q88 162 94 160 V96 Q94 86 101 86 Q108 86 108 96 V140 L110 74 Q110 64 118 64 Q126 64 126 74 V140 L128 80 Q128 70 135 70 Q142 70 142 80 V146 L144 102 Q144 92 151 92 Q158 92 158 102 V200 Q158 228 146 242 V268 Z"
            />
          </g>
        ))}
      </>
    ),
    cape: (
      <>
        <path {...fill} d="M104 72 Q120 82 136 72 L190 250 Q120 274 50 250 Z" />
        <path {...ink} d="M98 62 Q120 76 142 62 L200 258 Q120 290 40 258 Z" />
        <ellipse {...ink} cx="120" cy="62" rx="24" ry="8" />
        <path {...thin} d="M120 76 V270" />
      </>
    ),
  }[kind];

  return (
    <svg viewBox="0 0 240 300" className={styles.svg} aria-hidden="true">
      {axis}
      {body}
    </svg>
  );
}
