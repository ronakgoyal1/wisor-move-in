# Wisor Move-In

A mobile-first ordering flow for hostel essentials: pick your campus, build a kit, review
your cart, fill in delivery details, and hand the order off to Wisor over WhatsApp.

Built with React + Vite + Tailwind CSS + lucide-react.

## What's in this folder

```
wisor-move-in/
├── dist/              <- pre-built, ready to upload as-is (static files only)
├── src/
│   ├── App.jsx         <- all 6 screens + app state (cart, delivery form, etc.)
│   ├── main.jsx         <- React entry point
│   └── index.css         <- Tailwind directives + safe-area handling
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Option A - Deploy the pre-built `dist/` folder (fastest)

`dist/` is already built and contains only static files (`index.html`, `assets/*.js`,
`assets/*.css`). You can upload it as-is to wisor.in with no build step required:

- **Static host (Netlify / Vercel / Cloudflare Pages / S3+CloudFront / Nginx):**
  upload the *contents* of `dist/` to your web root (or document root for wisor.in).
- **Plain Nginx/Apache server:** copy `dist/*` into your site's public folder, e.g.
  `/var/www/wisor.in/`.

That's it — `index.html` already references the hashed JS/CSS files correctly.

### Important: client-side routing fallback

This app is a single-page app with all "screens" handled in React state (no URL routing),
so there's nothing special to configure — every request just serves `index.html`. No
rewrite rules needed.

## Option B - Build it yourself from source

Use this if you want to edit the app (swap in real product data, connect a backend, etc.)
before deploying.

```bash
npm install
npm run build      # outputs to dist/
npm run preview    # optional: preview the production build locally
```

Then deploy the resulting `dist/` folder as described in Option A.

For local development with hot reload:

```bash
npm install
npm run dev
```

## Things to wire up before going fully live

The app currently runs entirely on mock data and client-side state — nothing is sent to
a server yet. Before this is production-ready on wisor.in, you'll likely want to:

1. **Replace `PRODUCTS`, `KITS`, and `COLLEGES` in `src/App.jsx`** with real catalog data
   (ideally fetched from an API instead of hardcoded).
2. **Set a real WhatsApp business number** — `handleSendWhatsApp()` in `src/App.jsx`
   currently falls back to a placeholder number (`91XXXXXXXXXX`) if the user leaves the
   WhatsApp field blank. Point this at your actual WhatsApp Business number, or require
   the field before allowing checkout.
3. **Add basic form validation** on the delivery details screen (the fields are currently
   unvalidated).
4. **Add a favicon / app icons** under `public/` and reference them from `index.html` if
   you want a branded tab icon and "Add to Home Screen" icon.
5. **Point the domain**: deploy `dist/` (or your CI build output) to wherever wisor.in's
   DNS/hosting currently points.

## Notes on the design

- The app fills the full viewport edge-to-edge on phones (its actual target device).
  On tablet/desktop screens it renders inside a centered, phone-shaped preview card —
  that's a desktop-only affordance for browsing/demoing and has no effect on mobile.
- There's no fake status bar (time/battery/signal) baked into the UI — real phones
  already show their own status bar, so the app starts right below it via safe-area
  padding (`env(safe-area-inset-top)`), which also respects notches on iOS.
