/* Line icons drawn for OneColor's claims — 24px grid, 1.4 stroke, matching the blueprint language. */
export default function BenefitIcon({ name, size = 28 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (name) {
    case "click":
      return (
        <svg {...common}>
          <circle cx="12" cy="14" r="7" />
          <path d="M12 7V4M9.5 4h5M12 14V7" />
          <path d="M5 14h14" strokeDasharray="1.5 2" />
        </svg>
      );
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 3.5c3 4 5.5 7 5.5 10a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-10Z" />
          <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
          <path d="M5 19 13 11" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3.5 19 6v5.5c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6l7-2.5Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M19 12a7 7 0 1 1-2.05-4.95" />
          <path d="M19 4.5V8h-3.5" />
          <path d="M12 8.5V12l2.5 1.5" />
        </svg>
      );
  }
}
