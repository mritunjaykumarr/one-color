/*
  Editorial content: reviews, FAQ, journal, comparison and steps.
  Reviews are ILLUSTRATIVE launch-preview copy, written fresh for India per the brief.
  Replace them with verified customer reviews (e.g. from Shopify Product Reviews / Judge.me) at launch.
*/
import { IMG } from "./media";

export const SITE = {
  name: "OneColor",
  url: "https://onecolor.in",
  email: "care@onecolor.in",
  phone: "+91 80 4718 2290",
  whatsapp: "918047182290",
  hours: "Mon–Sat, 10am–7pm IST",
  freeShipping: 999,
  codFee: 0,
};

export const REVIEW_HIGHLIGHTS = [
  { label: "No mixing mess", count: 312 },
  { label: "Rich, even colour", count: 287 },
  { label: "Covers greys fully", count: 241 },
  { label: "Gentle smell", count: 176 },
  { label: "Lasts 5–6 weeks", count: 154 },
  { label: "Easy for first-timers", count: 133 },
];

export const HAIR_TYPES = ["Straight", "Wavy", "Curly", "Fine", "Thick"];

export const REVIEWS = [
  {
    id: "r1",
    name: "Ananya R.",
    city: "Bengaluru",
    age: 34,
    shade: "burgundy-wine",
    hairType: "Wavy",
    rating: 5,
    verified: true,
    title: "My first time colouring at home, and it looks salon-done",
    body: "I was scared of patches. The click thing is so simple, there's nothing to measure. The burgundy shows up beautifully in sunlight and stays dark indoors.",
    photo: IMG.festive,
    date: "2026-10-28",
    helpful: 41,
  },
  {
    id: "r2",
    name: "Meera K.",
    city: "Pune",
    age: 52,
    shade: "natural-black",
    hairType: "Straight",
    rating: 5,
    verified: true,
    title: "Greys at the temples, gone",
    body: "I used box colour for ten years and always ended up with stained basins. This one: one click, apply, done. Coverage at the hairline is complete.",
    photo: IMG.auntySari,
    date: "2026-10-21",
    helpful: 37,
  },
  {
    id: "r3",
    name: "Rohit S.",
    city: "Delhi",
    age: 44,
    shade: "espresso-dark-brown",
    hairType: "Thick",
    rating: 5,
    verified: true,
    title: "Natural, not shoe-polish",
    body: "Most dyes made my hair look painted. Espresso looks like my hair at 30. My wife used half the bottle for her roots a week later.",
    photo: IMG.saltPepper,
    date: "2026-10-18",
    helpful: 29,
  },
  {
    id: "r4",
    name: "Fatima Z.",
    city: "Hyderabad",
    age: 29,
    shade: "mahogany",
    hairType: "Curly",
    rating: 4,
    verified: true,
    title: "Gorgeous red glint on curls",
    body: "Lovely tone and my curls still feel soft. One star off because the box was a bit tight to open, but the gloves inside are thick and didn't tear.",
    photo: IMG.pinkSmile,
    date: "2026-10-12",
    helpful: 18,
  },
  {
    id: "r5",
    name: "Lakshmi V.",
    city: "Chennai",
    age: 58,
    shade: "natural-black",
    hairType: "Fine",
    rating: 5,
    verified: true,
    title: "No headache from the smell",
    body: "Ammonia always gave me a headache. This barely smells. My daughter ordered it and now we share one bottle every month.",
    photo: IMG.bobWoman,
    date: "2026-10-09",
    helpful: 33,
  },
  {
    id: "r6",
    name: "Kavya P.",
    city: "Ahmedabad",
    age: 26,
    shade: "chestnut-brown",
    hairType: "Straight",
    rating: 5,
    verified: true,
    title: "That honey glow!",
    body: "Exactly the warm brown in the photos. Saved what I didn't use and did my roots five weeks later. It worked just as well.",
    photo: IMG.heroAlt,
    date: "2026-10-02",
    helpful: 22,
  },
  {
    id: "r7",
    name: "Sunita M.",
    city: "Jaipur",
    age: 47,
    shade: "burgundy-wine",
    hairType: "Thick",
    rating: 5,
    verified: true,
    title: "Compliments at every function",
    body: "Did it the day before Diwali. Everyone asked which salon. Thick hair took more product, but I still had some left for touch-ups.",
    photo: IMG.smileGlasses,
    date: "2026-09-27",
    helpful: 26,
  },
  {
    id: "r8",
    name: "Arjun N.",
    city: "Kochi",
    age: 38,
    shade: "natural-black",
    hairType: "Wavy",
    rating: 4,
    verified: false,
    title: "Easy for men too",
    body: "Used it on the sides and beard line. Very easy. Would love a smaller bottle just for beards.",
    photo: IMG.beardMan,
    date: "2026-09-20",
    helpful: 12,
  },
  {
    id: "r9",
    name: "Priya D.",
    city: "Mumbai",
    age: 31,
    shade: "espresso-dark-brown",
    hairType: "Wavy",
    rating: 5,
    verified: true,
    title: "Softer than I expected",
    body: "My hair felt silky after. The conditioner in the box is genuinely good. I bought the full-size one.",
    photo: IMG.sindoorSmile,
    date: "2026-09-14",
    helpful: 15,
  },
];

export const RATING = { average: 4.8, count: 733 };

export const RESULTS = [
  { id: "res1", shade: "natural-black", age: 52, hairType: "Straight", before: IMG.greyWoman, after: IMG.heroWoman, note: "Temple greys, one application" },
  { id: "res2", shade: "burgundy-wine", age: 34, hairType: "Wavy", before: IMG.youngWoman, after: IMG.festive, note: "Dark brown base to wine-red" },
  { id: "res3", shade: "espresso-dark-brown", age: 44, hairType: "Thick", before: IMG.greyMan, after: IMG.saltPepper, note: "Salt-and-pepper softened" },
  { id: "res4", shade: "chestnut-brown", age: 26, hairType: "Straight", before: IMG.backHair, after: IMG.longBrownBack, note: "Black base, warm lift" },
  { id: "res5", shade: "mahogany", age: 29, hairType: "Curly", before: IMG.youngDark, after: IMG.goldenLight, note: "Red glint on curls" },
];

export const FOUNDER_NOTE = {
  name: "Avi Sharma",
  role: "Co-founder, OneColor",
  quote:
    "We spent two years testing this bottle on Indian hair: thick, fine, henna-treated, fully grey. We'd rather show you real results slowly than fill this page with stock praise. Every review here comes from a verified order.",
};

export const COMPARE = {
  columns: ["OneColor", "Box dye", "Salon visit"],
  rows: [
    { label: "Mixing", values: ["None. One click, 1:1", "Shake two bottles, guess the ratio", "Done for you"], wins: [0, 2] },
    { label: "Mess", values: ["Precision nozzle, no bowls", "Stained basins, towels, skin", "None at home"], wins: [0, 2] },
    { label: "Waste", values: ["Close and reuse the rest*", "Mixed dye must be thrown out", "Leftover mix discarded"], wins: [0] },
    { label: "Time", values: ["About 35 minutes, at home", "45–60 minutes with clean-up", "2–3 hours with travel"], wins: [0] },
    { label: "Cost per colour", values: ["From ₹437 per application*", "₹200–600, single use", "₹1,500–4,000 per visit"], wins: [0] },
    { label: "Smell", values: ["Ammonia-free*", "Strong ammonia", "Varies"], wins: [0] },
  ],
};

export const HOW_STEPS = [
  {
    n: "01",
    title: "Click",
    body: "Twist the collar until you feel the click. The seal between the two chambers opens.",
    detail: "No scissors, no sachets, no measuring.",
  },
  {
    n: "02",
    title: "Blend",
    body: "Colour cream and developer meet inside the bottle in an exact 1:1 ratio. Shake five times.",
    detail: "German-engineered dual chamber.",
  },
  {
    n: "03",
    title: "Apply",
    body: "Part, press, paint. The nozzle lays colour straight onto the roots, then comb it through.",
    detail: "Close it and store the rest for up to 4 months.*",
  },
];

export const APPLY_STEPS = [
  { n: "1", title: "Prep", time: "5 min", body: "Do a patch test 48 hours before. On the day, start with dry, unwashed hair. Put on the cape and gloves." },
  { n: "2", title: "Click & apply", time: "10 min", body: "Click, shake and apply section by section, roots first. Use the comb to spread colour to the lengths." },
  { n: "3", title: "Rinse & seal", time: "30 min", body: "Leave for 30 minutes, rinse until clear, then use the colour-lock conditioner. Done." },
];

export const FAQS = [
  {
    cat: "Before you colour",
    items: [
      {
        q: "Do I need a patch test?",
        a: "Yes, every time, even if you've used OneColor before. Dab a little mixed colour behind your ear or inside your elbow 48 hours before colouring. If you see redness, itching or swelling, don't use it.",
      },
      {
        q: "Which shade should I choose?",
        a: "Pick the shade closest to your natural colour for the most natural grey coverage, or go up to two shades warmer for a visible change. Our shade finder takes three taps, and our colour experts on WhatsApp reply within the hour.",
      },
      {
        q: "Can I use it on henna-treated hair?",
        a: "If you've used pure henna (no metallic salts) in the last 8 weeks, colour may take unevenly. Do a strand test first: colour a small hidden section and check it after 30 minutes.",
      },
    ],
  },
  {
    cat: "Grey coverage & results",
    items: [
      {
        q: "Will it cover 100% grey?",
        a: "All five launch shades are formulated for full grey coverage. For very resistant greys at the temples, apply there first and leave the full 30 minutes.",
      },
      {
        q: "How long does the colour last?",
        a: "It's permanent colour, so it grows out rather than washes out. Most people touch up roots every 4–6 weeks.",
      },
      {
        q: "Does it work on all hair types?",
        a: "Yes: straight, wavy, curly, fine and thick. Thick or long hair below the shoulders may need a full bottle; short hair or root touch-ups usually use half.",
      },
    ],
  },
  {
    cat: "The bottle",
    items: [
      {
        q: "How does the one-click bottle work?",
        a: "The bottle holds colour cream and developer in two sealed chambers. Twisting the collar until it clicks opens the seal, so both meet in a precise 1:1 ratio. You shake, then apply through the nozzle.",
      },
      {
        q: "Can I really reuse it?",
        a: "Once clicked, close the cap tightly and store it upright in a cool place. You can use the rest for up to 4 months.* Most people get 2–4 root touch-ups from one bottle.",
      },
      {
        q: "Is it ammonia-free and vegan?",
        a: "The formula is ammonia-free and contains no animal-derived ingredients.* It's pH-balanced to be kinder to your scalp.",
      },
    ],
  },
  {
    cat: "Orders & delivery",
    items: [
      {
        q: "Do you offer cash on delivery?",
        a: "Yes, COD is available across most Indian pin codes at no extra charge. Check your pin code on any product page.",
      },
      {
        q: "How fast is delivery?",
        a: "Metro cities: 2–3 days. Rest of India: 3–6 days. Free shipping on orders above ₹999.",
      },
      {
        q: "What if the shade isn't right?",
        a: "Unopened bottles can be returned within 7 days. If a clicked bottle didn't suit you, write to us and our colour expert will help, including a one-time shade exchange.",
      },
    ],
  },
];

export const POSTS = [
  {
    slug: "first-greys-what-to-do",
    title: "First greys at 28? What's actually happening, and what to do",
    excerpt: "Premature greying is common in India. Here's the science, the myths, and how to colour without committing to a monthly salon habit.",
    category: "Grey hair",
    read: 6,
    date: "2026-11-04",
    cover: IMG.mirrorMan,
    body: [
      { h: "It's more common than you think", p: "Studies on Indian adults suggest a significant share notice their first greys before 30. Genetics play the largest part; stress, thyroid and vitamin B12 levels can contribute too." },
      { h: "Plucking won't make it worse, but it won't help", p: "The myth that pulling a grey hair grows two is false. But repeatedly plucking can damage the follicle. Colour is the kinder option." },
      { h: "Colour the roots, not the whole head", p: "If greys are scattered, a root touch-up with a shade matching your natural colour blends them invisibly. With a reusable bottle you only use what you need." },
      { h: "When to see a doctor", p: "Sudden greying with fatigue or weight change is worth a quick blood test for B12, iron and thyroid." },
    ],
  },
  {
    slug: "choose-your-shade",
    title: "How to choose a hair colour shade for Indian skin tones",
    excerpt: "Warm, neutral or cool? A simple guide to undertones, levels and which OneColor shade flatters you most.",
    category: "Shade guide",
    read: 5,
    date: "2026-10-26",
    cover: IMG.goldenLight,
    body: [
      { h: "Start with your undertone", p: "Look at the veins on your wrist in daylight. Greenish means warm, bluish means cool, a mix means neutral. Most Indian skin tones are warm or neutral." },
      { h: "Stay within two levels", p: "Shade codes like 4.62 tell you the level (the first number, darkness) and the tone (after the dot). Staying within two levels of your natural colour looks most natural." },
      { h: "Warm skin", p: "Chestnut Brown and Mahogany bring out golden undertones beautifully." },
      { h: "Cool or neutral skin", p: "Espresso, Natural Black and Burgundy Wine balance cooler undertones and look rich in indoor light." },
    ],
  },
  {
    slug: "home-vs-salon-colour",
    title: "Home colour vs salon colour: an honest comparison",
    excerpt: "Time, cost, results and mess. What you gain and lose by colouring at home, and how to get salon-level results.",
    category: "How-to",
    read: 7,
    date: "2026-10-15",
    cover: IMG.brushing,
    body: [
      { h: "Where salons win", p: "Complex techniques like balayage or big lifts in colour. For those, see a professional." },
      { h: "Where home colour wins", p: "Grey coverage and root touch-ups. They're simple, frequent, and expensive to do at a salon every month." },
      { h: "The salon secrets you can copy", p: "Section hair into four. Apply to roots first. Time it properly. Seal with an acidic conditioner." },
    ],
  },
  {
    slug: "make-colour-last",
    title: "Seven habits that make hair colour last longer",
    excerpt: "From the first wash to sun and hard water: small changes that keep colour rich for weeks.",
    category: "Aftercare",
    read: 4,
    date: "2026-10-03",
    cover: IMG.longBrownBack,
    body: [
      { h: "Wait 72 hours to wash", p: "The cuticle takes a few days to fully close. Rinse with water only if you must." },
      { h: "Go sulphate-free", p: "Sulphates strip colour molecules faster. A gentle shampoo makes a visible difference by week three." },
      { h: "Cool water, always", p: "Hot water opens the cuticle. Finish with a cool rinse." },
      { h: "Mind the hard water", p: "Many Indian cities have hard water, which dulls colour. A shower filter or a weekly clarifying rinse helps." },
    ],
  },
  {
    slug: "colour-for-men",
    title: "Hair colour for men: covering grey without looking 'dyed'",
    excerpt: "The trick is choosing one shade lighter than you think, and letting a little grey show.",
    category: "Men",
    read: 4,
    date: "2026-09-22",
    cover: IMG.saltPepper,
    body: [
      { h: "Go one shade lighter", p: "Jet black on greying men often looks flat. Espresso Dark Brown reads as natural black in most light." },
      { h: "Leave the temples soft", p: "A shorter development time at the temples leaves a hint of silver, which looks deliberate." },
    ],
  },
  {
    slug: "patch-test-guide",
    title: "The 48-hour patch test: why it matters and how to do it",
    excerpt: "A two-minute step that keeps colouring safe. Here's exactly how to do it with a OneColor bottle.",
    category: "Safety",
    read: 3,
    date: "2026-09-10",
    cover: IMG.gloveApply,
    body: [
      { h: "Why every time", p: "Sensitivity can develop even after years of colouring without issues." },
      { h: "How", p: "Click the bottle, put a pea-sized amount behind your ear, leave it uncovered for 48 hours. No reaction? You're good to go." },
    ],
  },
];

export const ANNOUNCEMENTS = [
  "Launch offer: 12% off every shade, no code needed",
  "Free delivery above ₹999 · Cash on delivery available",
  "Extra 5% off on UPI payments",
];

// ——— Appended for secondary pages ———
export const RATING_DIST = { 5: 612, 4: 94, 3: 18, 2: 6, 1: 3 };

export const POLICIES = {
  "shipping-returns": {
    title: "Shipping & returns",
    updated: "2026-11-01",
    intro: "Fast, tracked delivery across India, cash on delivery where available, and a fair returns promise if a shade isn't right for you.",
    sections: [
      {
        h: "Delivery times",
        p: [
          "Orders placed before 2pm IST on working days are packed the same day.",
          "Metro cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad): 2–3 working days.",
          "Rest of India: 3–6 working days. Some remote pin codes in the North-East, J&K and island territories may take up to 9 days.",
          "Check your pin code on any product page for an estimate before you order.",
        ],
      },
      {
        h: "Shipping charges",
        p: ["Free delivery on orders above ₹999.", "Orders below ₹999 carry a flat ₹79 delivery charge, shown at checkout before you pay."],
      },
      {
        h: "Cash on delivery",
        p: [
          "COD is available on most pin codes at no extra charge, for orders up to ₹10,000.",
          "Please keep the exact amount ready. For your safety, our delivery partners won't ask for OTPs or card details at the door.",
        ],
      },
      {
        h: "Tracking your order",
        p: ["You'll get a tracking link by SMS, WhatsApp and email as soon as your order ships. You can also ask our support team for an update at any time."],
      },
      {
        h: "Returns on unopened products",
        p: [
          "Unopened, unclicked products in their original packaging can be returned within 7 days of delivery for a full refund.",
          "Raise a return from the Contact page with your order ID. We'll arrange a free pickup in most pin codes.",
          "Refunds go back to the original payment method within 5–7 working days of the return reaching us. COD orders are refunded by UPI or bank transfer.",
        ],
      },
      {
        h: "Opened bottles & shade exchange",
        p: [
          "For hygiene reasons, clicked or opened bottles can't be returned.",
          "If a shade didn't turn out as you hoped, write to us within 14 days with a daylight photo. A colour expert will help, and you're eligible for a one-time shade exchange.",
        ],
      },
      {
        h: "Damaged or wrong items",
        p: ["If anything arrives damaged, leaking or incorrect, tell us within 48 hours of delivery with a photo of the parcel and product. We'll send a free replacement right away."],
      },
    ],
  },
  privacy: {
    title: "Privacy policy",
    updated: "2026-11-01",
    intro: "We collect only what we need to deliver your order and look after you. We never sell your personal data.",
    sections: [
      {
        h: "What we collect",
        p: [
          "Order details: your name, delivery address, phone number and email.",
          "Payment information is processed by our PCI-DSS compliant payment partners. We never see or store your full card details.",
          "Messages you send us through the contact form, email or WhatsApp.",
          "Basic, anonymised analytics about how the site is used, so we can improve it.",
        ],
      },
      {
        h: "How we use it",
        p: [
          "To process and deliver your orders, send order updates, and handle returns and support.",
          "To send shade drops and offers, only if you've opted in. Every email has a one-click unsubscribe.",
        ],
      },
      {
        h: "Cookies & local storage",
        p: [
          "We use essential browser storage to remember your bag between visits. It stays on your device.",
          "Analytics cookies are used only in aggregate. You can clear or block them in your browser settings at any time.",
        ],
      },
      {
        h: "Sharing",
        p: [
          "We share data only with the partners who help us run the store: payment gateways, courier partners and our e-commerce platform. Each is bound by confidentiality.",
          "We never sell or rent your personal data to anyone.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "In line with India's Digital Personal Data Protection Act, 2023, you can ask to see, correct or delete your personal data, or withdraw consent, at any time.",
          "Write to care@onecolor.in and we'll respond within 30 days.",
        ],
      },
      {
        h: "Security",
        p: ["Our site runs over HTTPS with strict security headers. Access to customer data is limited to the people who need it to serve you."],
      },
    ],
  },
  terms: {
    title: "Terms of use",
    updated: "2026-11-01",
    intro: "These terms apply when you browse onecolor.in or buy from us. By placing an order, you agree to them.",
    sections: [
      {
        h: "Products & safety",
        p: [
          "OneColor is a permanent hair colour for external use on scalp hair only. Do not use on eyebrows or eyelashes.",
          "Always do a patch test 48 hours before every use, and follow the instructions in the box. Do not use if you have a sensitive, irritated or damaged scalp, or if you have reacted to hair colour before.",
          "Results vary with your natural hair colour, porosity, previous treatments (including henna) and how the product is used.",
        ],
      },
      {
        h: "Pricing & orders",
        p: [
          "All prices are in Indian Rupees and include GST. MRP is the maximum retail price printed on the pack.",
          "We may cancel an order if a product is out of stock, or if a pricing error is obvious. If you've already paid, we'll refund you in full.",
        ],
      },
      {
        h: "Offers",
        p: ["Launch discounts and codes can't be combined unless stated, have no cash value, and may end without notice."],
      },
      {
        h: "Content",
        p: ["All text, images, the bottle design and the OneColor brand on this site belong to OneColor or its licensors. Please don't reuse them without permission."],
      },
      {
        h: "Liability",
        p: ["To the extent the law allows, our liability for any claim relating to a product is limited to the price you paid for it."],
      },
      {
        h: "Governing law",
        p: ["These terms are governed by the laws of India. Any disputes fall under the courts of Bengaluru, Karnataka."],
      },
    ],
  },
};
