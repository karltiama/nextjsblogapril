# Umami Cloud (portfolio)

## Tracking script

Page views are collected via **next/script** in `app/layout.tsx`:

- Loads `https://cloud.umami.is/script.js` after the page is interactive (`strategy="afterInteractive"`).
- **`data-domains`** is set to `karltiama.dev,www.karltiama.dev` only on **Vercel production** (`VERCEL_ENV === "production"`) or on a **local production** server (`next start` without `VERCEL`). It is omitted during `next dev` and on **Vercel preview** deploys so those hostnames still send events (see [tracker configuration](https://umami.is/docs/tracker-configuration)).
- **`data-exclude-search="true"`** — query strings are not stored with page paths.
- **`data-do-not-track="true"`** — respects the browser DNT preference when set.
- **`data-performance="true"`** — sends Core Web Vitals to Umami when supported by your Cloud script version.

The website id is defined next to the script as `UMAMI_WEBSITE_ID` (must match the site in [Umami Cloud](https://cloud.umami.is)).

## Public dashboard (share link)

A read-only **Share** URL is linked from the site footer (regional host such as `https://us.umami.is/share/...`). To change it:

1. In Umami Cloud, open your site → **Share** → copy the URL.
2. Update the `href` in `components/site-footer.tsx`.

## What to configure in Umami Cloud (your account)

These are not stored in this repo:

- **Share** visibility and regenerating the link if it leaks.
- **Filters** / internal traffic (IPs, paths) if you see noise.
- **Goals or custom events** for important clicks (optional; can use `umami.track` later in code).

## Troubleshooting

- **No hits on production** — Confirm the site id, domain in Umami, and that the live hostname is `karltiama.dev` or `www.karltiama.dev` (matches `data-domains` in production).
- **No hits on localhost with `next start`** — A local production build applies `data-domains`, so hits from `localhost` are ignored; use `npm run dev` or test on the live domain.
- **Share page “Access denied”** — Regenerate share URL or check site privacy settings in Umami.
