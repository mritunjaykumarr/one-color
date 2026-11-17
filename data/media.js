/*
  Photography & video map.
  Model photography uses high-resolution assets from /assets/ (models 1-9)
  tuned to Indian beauty and the 9 OneColor shades.
*/

const u = (id) => `https://images.unsplash.com/photo-${id}`;
const p = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const MODELS = {
  1: { src: "/assets/model-1.jpg", alt: "Model with luminous, wavy chestnut-brown hair" },
  2: { src: "/assets/model-2.jpg", alt: "Model with sleek dark hair, round sunglasses and denim jacket" },
  3: { src: "/assets/model-3.jpg", alt: "Model with glossy natural-black high ponytail and radiant skin" },
  4: { src: "/assets/model-4.jpg", alt: "Model with sculpted wavy hair in timeless tailored styling" },
  5: { src: "/assets/model-5.jpg", alt: "Model with luminous sunlit honey-caramel blonde hair" },
  6: { src: "/assets/model-6.jpg", alt: "Model with deep espresso wavy bob hair in editorial chiaroscuro" },
  7: { src: "/assets/model-7.jpg", alt: "Model with lustrous, cascading burgundy-wine hair and plum tones" },
  8: { src: "/assets/model-8.jpg", alt: "Model with sleek, straight ash-toned hair" },
  9: { src: "/assets/model-9.jpg", alt: "Model with warm mahogany-copper hair in golden sunset light" },
};

export const IMG = {
  // Hero + brand models
  heroWoman: MODELS[3],
  heroAlt: MODELS[1],
  marigoldHair: MODELS[7],
  combing: MODELS[3],
  sisters: MODELS[1],
  mirrorMan: MODELS[6],
  greyWoman: MODELS[4],
  spectaclesWoman: MODELS[2],
  backHair: MODELS[4],
  blueSari: MODELS[2],
  profileWoman: MODELS[6],
  // Ages & people
  smileGlasses: MODELS[1],
  auntySari: MODELS[6],
  bobWoman: MODELS[4],
  youngDark: MODELS[3],
  goldenLight: MODELS[9],
  sindoorSmile: MODELS[7],
  pinkSmile: MODELS[5],
  festive: MODELS[7],
  sunlitSari: MODELS[9],
  longBrownBack: MODELS[7],
  youngWoman: MODELS[8],
  // Men / Editorial
  saltPepper: MODELS[4],
  youngMan: MODELS[2],
  youngMan2: MODELS[6],
  manBlue: MODELS[3],
  greyMan: MODELS[4],
  beardMan: MODELS[2],
  // Hair close-ups & shade tones
  hairWavyBrown: MODELS[1],
  hairCopper: MODELS[9],
  hairAuburn: MODELS[7],
  hairWavyDark: MODELS[3],
  hairGlow: MODELS[5],
  // Rituals & application
  brushing: MODELS[1],
  gloveApply: MODELS[2],
};

// Shade-specific imagery. Each shade page uses its own tailored set of model photography.
export const SHADE_IMAGES = {
  black: { portrait: MODELS[3], hair: IMG.hairWavyDark, life: MODELS[2], before: MODELS[4] },
  espresso: { portrait: MODELS[6], hair: IMG.hairWavyDark, life: MODELS[3], before: MODELS[2] },
  chestnut: { portrait: MODELS[1], hair: IMG.hairWavyBrown, life: MODELS[9], before: MODELS[4] },
  mahogany: { portrait: MODELS[9], hair: IMG.hairAuburn, life: MODELS[7], before: MODELS[1] },
  burgundy: { portrait: MODELS[7], hair: IMG.hairGlow, life: MODELS[1], before: MODELS[3] },
  cocoa: { portrait: MODELS[2], hair: IMG.hairWavyBrown, life: MODELS[6], before: MODELS[4] },
  copper: { portrait: MODELS[4], hair: IMG.hairCopper, life: MODELS[9], before: MODELS[1] },
  honey: { portrait: MODELS[5], hair: IMG.hairGlow, life: MODELS[8], before: MODELS[5] },
  ash: { portrait: MODELS[8], hair: IMG.hairWavyBrown, life: MODELS[4], before: MODELS[8] },
};

export const VIDEO = {
  application: { src: "/media/application.mp4", poster: IMG.brushing.src },
};

export function imgUrl(src, w = 1200, q = 70) {
  if (typeof src === "string") {
    if (src.includes("images.unsplash.com")) return `${src}?w=${w}&q=${q}&auto=format&fit=crop`;
    if (src.includes("images.pexels.com")) return `${src}?auto=compress&cs=tinysrgb&w=${w}`;
  }
  return src;
}
