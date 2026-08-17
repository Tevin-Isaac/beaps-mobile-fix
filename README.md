# BEAPS Mobile Fix — Next.js site

A real Next.js (pages router) build of the client's design (`beaps-mobile-fix.html`, kept for reference only — not used at runtime).

## Structure

- `pages/` — one route per screen: home, repairs, quote, shop, track, tradein, about, contact
- `components/` — `Header`, `Footer`, `CartDrawer`, `Layout`
- `context/CartContext.js` — cart state shared across pages (badge, drawer, WhatsApp order link)
- `lib/data.js` — product catalog, repair price list, quote/trade-in pricing logic
- `styles/globals.css` — design tokens ported from the client design (brand color is green)
- `public/assets/` — fonts + logo extracted from the original design file

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.
