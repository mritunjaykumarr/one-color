import { useId } from "react";
import styles from "./BottleBlueprint.module.scss";

/*
  The one-click bottle as a fine-line technical drawing — "German-engineered" told as a spec
  sheet rather than a cartoon render. Hairline strokes, dimension lines and numbered callouts.
  tone: "ink" (on cream) | "cream" (on plum). state: "sealed" | "clicked".
  `labels` shows the numbered callout leaders (1 collar · 2 chamber A · 3 chamber B · 4 nozzle · 5 seal).
  PLACEHOLDER drawing until client CAD / product photography is supplied.
*/
export default function BottleBlueprint({ tone = "ink", state = "clicked", hex = "#8c1c34", labels = true, className = "", title = "Technical drawing of the OneColor dual-chamber bottle" }) {
  const clip = `bp-${useId().replace(/[:]/g, "")}`;
  return (
    <svg viewBox="0 0 420 470" className={`${styles.bp} ${styles[tone]} ${state === "clicked" ? styles.clicked : ""} ${className}`} role="img" aria-label={title} style={{ "--fill": hex }}>
      {/* construction grid */}
      <g className={styles.grid} aria-hidden="true">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 38} y1="10" x2={20 + i * 38} y2="460" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="10" y1={20 + i * 40} x2="410" y2={20 + i * 40} />
        ))}
      </g>

      {/* centre axis */}
      <line className={styles.axis} x1="210" y1="14" x2="210" y2="452" />
      <line className={styles.axis} x1="70" y1="290" x2="350" y2="290" />

      {/* chambers (fill animates on click) */}
      <clipPath id={clip}>
        <circle cx="210" cy="290" r="112" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <rect className={styles.chamberA} x="98" y="178" width="112" height="224" />
        <rect className={styles.chamberB} x="210" y="178" width="112" height="224" />
        <circle className={styles.mix} cx="210" cy="290" r="112" />
      </g>
      {/* hatching on chamber A */}
      <g clipPath={`url(#${clip})`} className={styles.hatch} aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={i} x1={60 + i * 10} y1="180" x2={-60 + i * 10} y2="400" />
        ))}
      </g>

      {/* body */}
      <circle className={styles.stroke} cx="210" cy="290" r="128" />
      <circle className={styles.thin} cx="210" cy="290" r="112" />
      <line className={`${styles.thin} ${styles.seal}`} x1="210" y1="178" x2="210" y2="402" />

      {/* neck, collar, cap */}
      <path className={styles.stroke} d="M186 166 V146 H234 V166" />
      <rect className={styles.stroke} x="170" y="118" width="80" height="28" rx="6" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} className={styles.thin} x1={178 + i * 8} y1="122" x2={178 + i * 8} y2="142" />
      ))}
      <g className={styles.cap}>
        <rect className={styles.stroke} x="182" y="46" width="56" height="72" rx="10" />
        <path className={styles.thin} d="M196 58 V106" />
        <path className={styles.stroke} d="M204 46 V30 Q210 22 216 30 V46" />
      </g>
      <circle className={styles.dot} cx="210" cy="132" r="4" />

      {/* dimension lines */}
      <g className={styles.dim} aria-hidden="true">
        <line x1="82" y1="436" x2="338" y2="436" />
        <line x1="82" y1="428" x2="82" y2="444" />
        <line x1="338" y1="428" x2="338" y2="444" />
        <text x="210" y="452" textAnchor="middle">Ø 92 mm</text>
        <line x1="380" y1="30" x2="380" y2="418" />
        <line x1="372" y1="30" x2="388" y2="30" />
        <line x1="372" y1="418" x2="388" y2="418" />
        <text x="392" y="228" transform="rotate(90 392 228)" textAnchor="middle">
          H 148 mm
        </text>
      </g>

      {labels ? (
        <g className={styles.labels} aria-hidden="true">
          {[
            ["1", 250, 132, 300, 92],
            ["2", 150, 250, 64, 210],
            ["3", 272, 330, 340, 372],
            ["4", 210, 30, 140, 26],
            ["5", 210, 300, 120, 352],
          ].map(([n, x1, y1, x2, y2]) => (
            <g key={n}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} />
              <circle cx={x2} cy={y2} r="11" />
              <text x={x2} y={y2 + 4} textAnchor="middle">
                {n}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}

export const BLUEPRINT_PARTS = [
  { n: "1", title: "Click collar", body: "A quarter-turn until you feel the click. It opens the internal seal; nothing to cut, pierce or measure." },
  { n: "2", title: "Chamber A · colour cream", body: "Your shade's pigment cream, kept sealed from air and developer until the moment you click." },
  { n: "3", title: "Chamber B · developer", body: "The oxidising developer, held separately so it can't weaken the colour on the shelf." },
  { n: "4", title: "Precision nozzle", body: "Lays a fine line of colour straight onto the parting. No brush, no bowl." },
  { n: "5", title: "1:1 seal", body: "Both chambers release in an exact one-to-one ratio, every time, so results don't depend on guesswork." },
];
