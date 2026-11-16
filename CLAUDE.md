# Project details

**OneColor** is a premium D2C hair-colour brand for India. It sells one product: a permanent hair colour in a German-engineered, dual-chamber "one-click" bottle that releases colour cream and developer together in a 1:1 ratio (no manual mixing, no waste, and reusable for up to 4 months*). It is sold as Keralock in Europe, but **never use the Keralock name or the European site's visuals**.

- **Range:** 5 shades at launch, growing to 9. Each shade has its own product page, built from one reusable template that uses the shade's colour as its accent.
- **Price:** ₹2,000 MRP with a 10–15% online discount, shown as a struck-through MRP. Positioned as premium, alongside brands like Just Herbs.
- **Audience:** Indian women and men aged 23–60, from first grey hairs to long-term colourers. Mobile-first, because most traffic is mobile.
- **Design direction:** vibrant, warm and aspirational, with beauty-led photography of Indian models and real hair results. Avoid the minimal, black-and-white, clinical European look. The tone reference is Dream Beauty. The hero object is the circular bottle, with one-click activation as a recurring motif. Voice is premium but friendly and short.
- **Pages:** Home, Shop all (search plus filters by category, shade family, type and price, driven by URL params from the nav, the home page and the dropdowns), Shade product page, How it works, Reviews & results, Blog, FAQ, About, Support/Contact, Shipping & returns.
- **Home section order:** Hero → Shade selector → How it works → Results → Application guide → Why OneColor (vs box dye / salon) → Reviews/UGC → FAQ → Guides/blog.
- **Claims marked * need client approval:** vegan, ammonia-free, patented, reusable up to 4 months. Until the client sends real assets (logo, shade names and swatches, photos), use clearly marked placeholders.
- **Commerce:** cart and catalogue are local for now (product data lives in `/data`). Shopify will be integrated later.
- Full brief: `docs/PROJECT.md`.

# Rules

- Never use typescript and Tailwind CSS.
- if require to install an NPM package, always analyse the package.json file and find out which package needs to be installed as per requirement and install it.
- ALwasy use "use client" at the top of functional components which is using client side code like react hooks but not for all components.
- Never write refresh setInterval logics meaninglessly unless instructed.
- ALways use this method - "../../../" for importing in the components.
- We use NPM so always use that. No Yarn.
- Under the src folder, only the app folder will be there under which we will have the api folder which is the normal NextJS app router concept, but apart from them all the other folders like utils etc, will be under the root project.
- All the components will be under the components folder under the root project.
- There must be no duplication of same files or having any empty folders in the project. Always check that. If you find it, then remove it after checking which is important to keep.
- Never break or disturb any other existing code, functionalities or UI while coding something or implementing some changes or doing some task as instructed.
- Never change or update any code if not instructed. Only Stick to the specific task that has been instructed to you to do.
- If we are using mongoose schema then always create a models folder in the root of the project where you will create the schema JS files.
- Do not miss any points that I have explained to you. Make sure you follow and implement each and everything that I have told you in the composer.
- ALways search the web and research if you have any confusion while fixing an error for clarity. so that you make no mistakes and do it perfectly.
- Make sure our project is highly and completely secured, so that once launched in production, it should not get hacked or attacked by hackers or have any unethical access by bots. It must be a completely safe and secured working product for its users - VERY IMPORTANT!!
- Before building any module, read the relevant section of docs/PROJECT.md for its full spec. Read only the section you need for the current task — do not load the whole file every session.

# Images to Coding the UI

- If you are given an UI image and asked to build the excat UI as shown in the image pixel perfectly with no changes, analyse the UI components, styles, colors, alignments, shades, animations everything shown in the image attached and code the excat replica of the UI shown in the image. You must be the perfect analyser of the image and convert and clone the UI shown in the image into excat real UI in our app if instructed with no changes. The UI in our app should be the same as shown in the image attached.

Make the excat replica of this UI as you can see in the image attached.

Observe the detailing of the UI in the image, the components, colors, texts, fonts, gradients, styling, alignments, shapes and everything and convert the UI shown in the image to the real UI in this project. There must not be even 1% change in the UI that you will code and build. It must be excatly the same as shown in the image attached.

Do it perfectly without breaking any other existing code.

# Tech Stack

- NextJS latest version with app router - Full stack (Frontend and Backend).
- DB - MongoDB
- OpenRouter APIs (For AI Integration)
- Vercel for deployment.
- Pure JSX and SCSS, ShadCN UI, framer, Gsap, framer-motion and other packages as per requirement for building advanced/Modern, clean and attractive UI and Smooth slick motion animations.
- React-icons for icons preferable.
- NextAuth v5 or Latest version for user authentication
- Other tech stacks as per requirement....
