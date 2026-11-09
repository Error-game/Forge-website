# Vero Residence

A one-page site for the Vero Residence building in Lebanon, in English and Arabic. It is a plain
React + Vite page that builds to static files, so it can be hosted free with no server
(Cloudflare Pages or Netlify).

## Files

- `content.js`: every word on the page, English and Arabic side by side. Edit the text here.
- `App.jsx`, `styles.css`: the page. Plain CSS in navy / sand / light grey, using logical properties
  so the same rules lay out English (left to right) and Arabic (right to left). Nothing animates.
- `index.html`: picks the language before the page draws, so Arabic never flashes as English.
- `assets/vero-logo.webp`, `public/`: the logo and the browser / phone icons made from it.
  `public/_headers` tells Cloudflare Pages and Netlify to cache the hashed files for a year.
- `netlify.toml`, `wrangler.jsonc`: only needed if the site is later connected to GitHub on Netlify
  or Cloudflare Workers. Drag-and-drop uploads ignore them.

## Language

Arabic browsers get Arabic, everyone else English. The button in the top bar switches language and the
choice is remembered on that device. `?lang=ar` or `?lang=en` in the address forces one.

## Working on it

```bash
npm install
npm run dev       # live preview while editing
npm run build     # rebuilds the finished site into site/ (commit site/ afterwards)
```

`site/` is the finished site, already built and committed, so a host can serve it as it is. Do not
point a host at this folder itself: its `index.html` is the source and shows a blank page unless built.

To make an upload-ready zip (with `index.html` at the top of the zip, not inside a folder):

```bash
npm run build && rm -f vero-residence-site.zip && (cd site && zip -r ../vero-residence-site.zip .)
```

## Putting it online (free)

**From GitHub with Cloudflare Pages** (updates on every push to the chosen branch):

- Production branch: the branch that holds this folder
- Framework preset: None
- Build command: leave empty
- Build output directory: `vero-residence/site`
- Root directory: leave empty

**Or upload the zip** `vero-residence-site.zip` (it holds the same files as `site/`):

- Netlify Drop: https://app.netlify.com/drop
- Cloudflare: Workers & Pages → Create application → Pages → Upload assets (Direct Upload)

## Before it goes public

- The Arabic specification lines are the owner's own text (spelling and spacing tidied). The
  taglines, the intro under each category, the hero and contact wording, and the heading
  "الطاقة الشمسية والاتصالات" were machine-translated: have a native speaker read `content.js`.
- The original page had a photo of the building next to the title. It was not in the files sent, so
  the hero shows a small "At a glance" card instead. Send the photo to add it back.
- The contact buttons open an email to `info@veroresidence.com`, as in the original.
