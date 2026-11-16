/*
  Hair recolouring for the Colour Studio — runs entirely in the browser on a canvas.

  weight(px) = darkness × (1 − saturation) × region
    region   = hand-authored hair polygon minus a face ellipse, blurred for a feathered edge
  plates:
    greys    = strand-wise silver streaks (simulated "before")
    shade    = luminance-preserving colour transfer into the shade, with glow in highlights
  Everything is computed once per source/shade and cached as ImageBitmap-ready canvases.
*/

const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
};

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

// cheap deterministic hash → 0..1
const hash = (x) => {
  const s = Math.sin(x * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// smooth 1-D value noise (interpolated hash) — gives soft strand bands, not barcode
const vnoise = (x) => {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
};

// separable box blur on a Float32 weight map (softens speckle at the hair edges)
function blurWeight(src, w, h, r) {
  const tmp = new Float32Array(src.length);
  const out = new Float32Array(src.length);
  const k = 1 / (2 * r + 1);
  for (let y = 0; y < h; y++) {
    let acc = 0;
    const row = y * w;
    for (let x = -r; x <= r; x++) acc += src[row + Math.min(w - 1, Math.max(0, x))];
    for (let x = 0; x < w; x++) {
      tmp[row + x] = acc * k;
      acc += src[row + Math.min(w - 1, x + r + 1)] - src[row + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < w; x++) {
    let acc = 0;
    for (let y = -r; y <= r; y++) acc += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
    for (let y = 0; y < h; y++) {
      out[y * w + x] = acc * k;
      acc += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
    }
  }
  return out;
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function buildMask(img, { polygon, exclude = [], feather = 0.012 }) {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  const blur = Math.round(Math.max(w, h) * feather);
  ctx.filter = `blur(${blur}px)`;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  polygon.forEach(([x, y], i) => (i ? ctx.lineTo(x * w, y * h) : ctx.moveTo(x * w, y * h)));
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#000";
  exclude.forEach(({ cx, cy, rx, ry }) => {
    ctx.beginPath();
    ctx.ellipse(cx * w, cy * h, rx * w, ry * h, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  const region = ctx.getImageData(0, 0, w, h).data;

  ctx.filter = "none";
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0);
  const src = ctx.getImageData(0, 0, w, h);
  const d = src.data;
  const weight = new Float32Array(w * h);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    const reg = region[i] / 255;
    if (reg <= 0.002) continue;
    const r = d[i] / 255;
    const g = d[i + 1] / 255;
    const b = d[i + 2] / 255;
    const L = lum(r, g, b);
    const mx = Math.max(r, g, b);
    // saturation is meaningless in near-black pixels (tiny channel noise reads as "vivid"),
    // so only trust it once there's enough light
    const sat = mx ? ((mx - Math.min(r, g, b)) / mx) * smooth(0.06, 0.22, mx) : 0;
    weight[p] = reg * smooth(0.5, 0.14, L) * (1 - smooth(0.66, 0.9, sat));
  }
  const soft = blurWeight(weight, w, h, Math.max(2, Math.round(w / 360)));
  // re-sharpen: keep body solid, edges feathered
  for (let p = 0; p < soft.length; p++) soft[p] = Math.min(1, soft[p] * 1.35);
  return { w, h, src, weight: soft };
}

function plateFrom(mask, fn) {
  const { w, h, src, weight } = mask;
  const out = new ImageData(new Uint8ClampedArray(src.data), w, h);
  const d = out.data;
  for (let p = 0, i = 0; p < weight.length; p++, i += 4) {
    const k = weight[p];
    if (k < 0.004) continue;
    const x = p % w;
    const y = (p / w) | 0;
    const r = d[i] / 255;
    const g = d[i + 1] / 255;
    const b = d[i + 2] / 255;
    const [nr, ng, nb] = fn(r, g, b, x, y);
    d[i] = (r + (nr - r) * k) * 255;
    d[i + 1] = (g + (ng - g) * k) * 255;
    d[i + 2] = (b + (nb - b) * k) * 255;
  }
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  c.getContext("2d").putImageData(out, 0, 0);
  return c;
}

/* simulated greys: soft silver strands that follow the hair's fall (salt-and-pepper, not flat) */
export function greysPlate(mask) {
  const W = mask.w;
  return plateFrom(mask, (r, g, b, x, y) => {
    const L = lum(r, g, b);
    // strands ~ 0.6% of width apart, drifting slowly down the length
    const u = (x + y * 0.08) / (W * 0.006);
    const strand = 0.6 * vnoise(u) + 0.4 * vnoise(u * 2.7 + 17);
    const amt = 0.5 + 0.42 * smooth(0.25, 0.85, strand);
    const silver = 0.52 + L * 0.85 + (strand - 0.5) * 0.14;
    const t = [silver * 0.985, silver * 0.975, silver * 0.955];
    return [r + (t[0] - r) * amt, g + (t[1] - g) * amt, b + (t[2] - b) * amt];
  });
}

/* shade transfer: keep each strand's light/shadow, swap its hue for the shade */
export function shadePlate(mask, hex, glowHex) {
  const s = hexToRgb(hex);
  const gl = hexToRgb(glowHex);
  const Ls = Math.max(0.02, lum(...s));
  return plateFrom(mask, (r, g, b) => {
    const L = lum(r, g, b);
    const lift = 0.55 + L / (Ls * 3.2);
    const hi = smooth(0.12, 0.38, L);
    return [
      Math.min(1, s[0] * lift * (1 - hi) + gl[0] * (0.5 + L) * hi),
      Math.min(1, s[1] * lift * (1 - hi) + gl[1] * (0.5 + L) * hi),
      Math.min(1, s[2] * lift * (1 - hi) + gl[2] * (0.5 + L) * hi),
    ];
  });
}
