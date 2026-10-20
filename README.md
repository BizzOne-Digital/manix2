# Mannix Investigations & Legal Services — Frontend

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
| `src/data/brand.js` | Brand name, logo path, contact (`info@mannixlegal.com`, `(942) 444-9422`), disclaimers, optional process-serving rate flag |
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

## Admin portal (services, testimonials, bookings)

URL: **`/admin/login`** (password from `ADMIN_PASSWORD`).

| Area | What you can do |
|------|-----------------|
| **Services** | Add / edit / delete services; upload images (stored in MongoDB, not on disk) |
| **Testimonials** | Add / edit / delete quotes |
| **Bookings** | Review contact-form inquiries; mark as reviewed (read-only workflow) |

### Environment (Vercel)

Set in the Vercel project:

- `MONGODB_URI` — MongoDB Atlas connection string  
- `ADMIN_PASSWORD` — admin login password  
- `SESSION_SECRET` — random string for signed session cookies  

Copy `.env.example` for local use.

### Local full stack (API + Vite)

```bash
npm run dev:full   # vercel dev — serves /api and proxies the Vite app
```

Or run `vite` alone: `/api` calls need `vercel dev` on port 3000 (see `vite.config.js` proxy).

### Image uploads (serverless-safe)

- `POST /api/upload` (admin) — `FormData`: `file`, `folder` (`products` \| `gallery` \| `pages` \| `misc`)  
- Public URL: `/api/uploads/{folder}/{filename}` (served from MongoDB `StoredUpload`)  
- Service records store only the URL string; replacing/removing images deletes the Mongo blob when saved.

Static fallbacks in `src/data/*.js` apply when the API is unavailable.

## Contact form behavior

Submissions are saved to MongoDB as **bookings** when the API is configured. If the API fails, the form falls back to `mailto:info@mannixlegal.com`. **Copy Inquiry** still works offline.

## Accessibility & motion

- `prefers-reduced-motion`: GSAP hero/scroll effects and route wipes are reduced; content stays visible.
- Magnetic button effect is disabled on touch/narrow viewports.

## Tech stack

- React 19 + Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- GSAP 3 + ScrollTrigger
- React Router 7
