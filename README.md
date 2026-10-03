# Mannix Investigation & Legal Services — Frontend

Premium marketing site built with **Vite**, **React**, **React Router**, **Tailwind CSS v4**, and **GSAP (ScrollTrigger)**.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Production build

```bash
npm install
npm run build
npm run preview
```

The static output is in **`dist/`** (HTML, hashed JS/CSS, `images/`, SPA rules). Upload **`dist` contents** to your host, or connect the repo to Netlify/Vercel (config files included).

| Host | Config in repo |
|------|----------------|
| Netlify | `netlify.toml` + `public/_redirects` |
| Vercel | `vercel.json` rewrites |
| Apache / cPanel | `public/.htaccess` (copied into `dist/` on build) |

After building locally, smoke-test:

```bash
npm run start
```

Open `http://localhost:4173` and check `/`, `/services`, `/contact`, and a bad URL for the 404 page.

### SPA hosting (direct URLs)

This app uses client-side routing. Every path must fall back to `index.html` except real files (assets, images). The table above covers common setups; nginx example: `try_files $uri $uri/ /index.html;`.

## Edit central content

| File | Purpose |
|------|---------|
| `src/data/brand.js` | Brand name, logo path, email, phone, disclaimers, optional process-serving rate flag |
| `src/data/services.js` | Service copy and anchors |
| `src/data/navigation.js` | Header/footer links |
| `src/data/testimonials.js` | Verified testimonials array (empty by default) |
| `src/data/images.js` | Image URLs, alt text, dimensions |

Change the brand spelling or legal name in **`brand.js` only**—components read from that object.

### Process serving success rate

`brand.processServingSuccessRate` holds the client-supplied `99.3%` figure. It is **not shown** unless you set `publishProcessServingSuccessRate: true` in `brand.js`.

## Replace imagery

1. Add files under `public/images/`.
2. Update `src` paths in `src/data/images.js` (e.g. `/images/your-photo.jpg`).
3. Keep `width` / `height` accurate to limit layout shift.

Logo: `public/images/mannix-logo.png`

## Add verified testimonials

In `src/data/testimonials.js`, append objects:

```js
export const testimonials = [
  {
    quote: 'Verified client statement.',
    name: 'Client or role label',
    role: 'Title or context',
    organization: 'Optional organization',
  },
]
```

Do not add fabricated reviews. The testimonials page renders this list automatically.

## Contact form behavior

The contact form **does not send email from the server**. It validates input and opens a `mailto:info@mannixlegal.com` link (or copies inquiry text via **Copy Inquiry**).

## Accessibility & motion

- `prefers-reduced-motion`: GSAP hero/scroll effects and route wipes are reduced; content stays visible.
- Magnetic button effect is disabled on touch/narrow viewports.

## Tech stack

- React 19 + Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- GSAP 3 + ScrollTrigger
- React Router 7
