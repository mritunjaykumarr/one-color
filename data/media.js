/*
  Photography & video map. All images are free-licence Unsplash / Pexels photos used as
  PLACEHOLDERS for the client's own shoot (Indian models 23–60, real colour results).
  Swap the `src` values once client photography arrives — every component reads from here.
*/

const u = (id) => `https://images.unsplash.com/photo-${id}`;
const p = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const IMG = {
  // Hero + brand
  heroWoman: { src: p("11624928"), alt: "Woman with long, glossy dark hair in a deep maroon drape" },
  heroAlt: { src: p("30703874"), alt: "Young woman with long, rich brown hair looking down" },
  marigoldHair: { src: p("8819313"), alt: "Woman lying on stone with long dark curls spread out, dotted with marigolds" },
  combing: { src: p("8751925"), alt: "A woman's long black hair being combed with a carved comb" },
  sisters: { src: p("8752670"), alt: "Two women in saris, one combing the other's hair" },
  mirrorMan: { src: p("12896856"), alt: "Man checking the grey at his temples in a hand mirror" },
  greyWoman: { src: p("40124295"), alt: "Woman in her fifties with silver hair tied up, in a yellow sari" },
  spectaclesWoman: { src: p("17633485"), alt: "Woman in her forties with long black hair and glasses, in a pink sari" },
  backHair: { src: p("13104308"), alt: "Woman seen from behind, a long dark ponytail down her back" },
  blueSari: { src: p("5370185"), alt: "Young woman in a blue sari tucking a flower behind her ear" },
  profileWoman: { src: p("10590531"), alt: "Side profile of a woman with a neat dark bun and temple jewellery" },
  // Ages & people (Unsplash)
  smileGlasses: { src: u("1774437777953-0599439dad1c"), alt: "Woman in her forties laughing, in a bright silk sari" },
  auntySari: { src: u("1774437895887-d1e801bae1a9"), alt: "Woman in her fifties in a red and gold sari" },
  bobWoman: { src: u("1547212371-eb5e6a4b590c"), alt: "Woman in her sixties with a sleek dark bob" },
  youngDark: { src: u("1771591101823-aef2abeadff5"), alt: "Young woman with long dark hair against green leaves" },
  goldenLight: { src: u("1771507057202-353aee0a508e"), alt: "Woman with long hair in golden evening light" },
  sindoorSmile: { src: u("1787021029390-7230ca3d3baf"), alt: "Smiling woman in her thirties with dark hair and sindoor" },
  pinkSmile: { src: u("1777641646589-c371d6947d95"), alt: "Smiling woman with dark wavy hair in a pink top" },
  festive: { src: u("1771654805882-95967672e6c1"), alt: "Woman in a festive sari with long dark hair" },
  sunlitSari: { src: u("1771507213365-c6047b40e2e1"), alt: "Woman in a red and black sari in warm sunlight" },
  longBrownBack: { src: u("1717665457181-7a206f1cd64d"), alt: "Long, glossy brown hair seen from behind" },
  youngWoman: { src: u("1747264464985-2bc2e20c739e"), alt: "Young woman with dark hair, looking at the camera" },
  // Men
  saltPepper: { src: u("1758728119257-d88284600a48"), alt: "Man in his forties with salt-and-pepper hair and glasses" },
  youngMan: { src: u("1712425718085-cdd2b2298669"), alt: "Young man with thick dark hair in a white turtleneck" },
  youngMan2: { src: u("1712425718855-5169714b3632"), alt: "Young man with swept-back dark hair" },
  manBlue: { src: u("1670110531916-41045e83cb0a"), alt: "Man in his thirties in a blue shirt" },
  greyMan: { src: u("1650962903665-d66116fe94ef"), alt: "Man in his fifties with grey hair and moustache" },
  beardMan: { src: p("12413562"), alt: "Young man with dark hair and a full beard, smiling" },
  // Hair close-ups (results)
  hairWavyBrown: { src: u("1560264641-1b5191cc63e2"), alt: "Close-up of glossy, wavy brown hair" },
  hairCopper: { src: u("1620939391250-eb822ac0818a"), alt: "Close-up of copper-red hair catching the light" },
  hairAuburn: { src: u("1621968520602-533d8120fb7f"), alt: "Close-up of deep auburn hair" },
  hairWavyDark: { src: u("1596911647169-7085321c81b8"), alt: "Close-up of long, wavy dark-brown hair" },
  hairGlow: { src: u("1620939391272-b03c1ccdd10c"), alt: "Warm, glowing strands of red-brown hair" },
  // Rituals
  brushing: { src: u("1638064432604-8da1fc75de09"), alt: "Woman brushing long dark hair at home" },
  gloveApply: { src: u("1707979577466-2d6109c68a45"), alt: "Gloved hands applying colour to sectioned hair" },
};

// Shade-specific imagery. Each shade page uses its own set; replace with the client's
// per-shade photography (on-hair, before/after) when it arrives.
export const SHADE_IMAGES = {
  black: { portrait: IMG.heroWoman, hair: IMG.backHair, life: IMG.profileWoman, before: IMG.greyWoman },
  espresso: { portrait: IMG.sindoorSmile, hair: IMG.hairWavyDark, life: IMG.youngDark, before: IMG.auntySari },
  chestnut: { portrait: IMG.heroAlt, hair: IMG.hairWavyBrown, life: IMG.longBrownBack, before: IMG.smileGlasses },
  mahogany: { portrait: IMG.goldenLight, hair: IMG.hairAuburn, life: IMG.sunlitSari, before: IMG.spectaclesWoman },
  burgundy: { portrait: IMG.festive, hair: IMG.hairGlow, life: IMG.pinkSmile, before: IMG.bobWoman },
  cocoa: { portrait: IMG.youngWoman, hair: IMG.hairWavyBrown, life: IMG.blueSari, before: IMG.auntySari },
  copper: { portrait: IMG.sunlitSari, hair: IMG.hairCopper, life: IMG.goldenLight, before: IMG.smileGlasses },
  honey: { portrait: IMG.pinkSmile, hair: IMG.hairGlow, life: IMG.heroAlt, before: IMG.bobWoman },
  ash: { portrait: IMG.blueSari, hair: IMG.hairWavyBrown, life: IMG.youngWoman, before: IMG.greyWoman },
};

export const VIDEO = {
  application: { src: "/media/application.mp4", poster: IMG.brushing.src },
};

export function imgUrl(src, w = 1200, q = 70) {
  if (src.includes("images.unsplash.com")) return `${src}?w=${w}&q=${q}&auto=format&fit=crop`;
  if (src.includes("images.pexels.com")) return `${src}?auto=compress&cs=tinysrgb&w=${w}`;
  return src;
}
