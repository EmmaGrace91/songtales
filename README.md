# Songtales

Static landing page for **Songtales** — personal songs written by Emma Stephenson.
Built with [Astro](https://astro.build), deployed to GitHub Pages at
**https://www.emmastephensonmusic.com**.

> Handmade by a person. Never AI.

---

## Run it locally

Requires Node 22 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Dev server with live reload                   |
| `npm run build`   | Builds the static site into `dist/`           |
| `npm run preview` | Serves the built `dist/` locally to check it  |

---

## Editing the site

Almost everything you'd want to change lives in two files.

### `src/site.ts` — links, names, image paths

- **`TALLY_FORM_URL`** — the request form every "Request a song" button points to.
  Change it here once and all four CTAs follow.
- **`DONATE_URL`** — currently `null`, so the CTA band shows a
  "Donate link coming soon" note. Set it to a URL and a Donate button appears
  automatically.
- **`IMAGES`** — the path to each photo (see below).
- **`SITE`** — name, tagline, the "Never AI" line, footer line, meta description.
- **`NAV_LINKS`** — the section links in the nav bar.

### `src/content.ts` — the words

All the body copy: the idea, the occasion list, the three steps, the About
paragraph, and the donation tiers and notes.

### Swapping in the real photos

The site currently ships **placeholder SVGs** so the layout is correct before the
real images land. To swap them in:

1. Drop the real files into `public/images/`.
2. Update the matching path in `IMAGES` in `src/site.ts` (change the extension
   from `.svg` to `.jpg`).

| Purpose               | `IMAGES` key  | Suggested filename          | Notes                                          |
| --------------------- | ------------- | --------------------------- | ---------------------------------------------- |
| Hero portrait         | `hero`        | `hero-portrait.jpg`         | Lace dress / flowers. Cropped `top center`.     |
| About — craft         | `aboutCraft`  | `about-piano.jpg`           | Emma at the piano, navy studio.                 |
| About — life          | `aboutLife`   | `about-family.jpg`          | Emma with toddler at the piano.                 |
| Logo emblem           | `logo`        | `logo.svg`                  | Circular piano + quill. Used in nav and footer. |

Every photo uses `object-fit: cover` with `object-position: top center`, so heads
stay in frame at any screen width. Update the alt text in `IMAGE_ALT` in
`src/site.ts` to match whatever you drop in.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. Nothing else to run.

### One-time GitHub Pages setup

1. Go to **Settings → Pages** in this repo.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   (Not "Deploy from a branch" — this repo deploys via the workflow.)
3. Under **Custom domain**, enter `www.emmastephensonmusic.com` and save.
   `public/CNAME` already contains this, so GitHub should pick it up on the first
   deploy; setting it in the UI as well is harmless and makes it explicit.
4. Once the DNS check passes, tick **Enforce HTTPS**. This can take up to 24 hours
   while GitHub provisions the TLS certificate — the tickbox is greyed out until
   it's ready.

Watch the deploy under the **Actions** tab.

---

## DNS setup for `www.emmastephensonmusic.com`

Set these at whichever registrar or DNS host manages `emmastephensonmusic.com`.

### The record that matters — `www`

| Type    | Name (Host) | Value                    | TTL     |
| ------- | ----------- | ------------------------ | ------- |
| `CNAME` | `www`       | `emmagrace91.github.io.` | 1 hour  |

That's it for the live site. Note the target is the **GitHub Pages hostname**
(`emmagrace91.github.io`) — not the repo name, and not an IP. Some DNS panels
want a trailing dot, some add it for you; both forms are fine.

### Optional — send the bare domain to `www` too

So that `emmastephensonmusic.com` (no `www`) doesn't 404, point the apex at
GitHub's Pages IPs. You cannot use a `CNAME` at the apex, so use `A` records —
plus `AAAA` for IPv6:

| Type   | Name (Host) | Value                  |
| ------ | ----------- | ---------------------- |
| `A`    | `@`         | `185.199.108.153`      |
| `A`    | `@`         | `185.199.109.153`      |
| `A`    | `@`         | `185.199.110.153`      |
| `A`    | `@`         | `185.199.111.153`      |
| `AAAA` | `@`         | `2606:50c0:8000::153`  |
| `AAAA` | `@`         | `2606:50c0:8001::153`  |
| `AAAA` | `@`         | `2606:50c0:8002::153`  |
| `AAAA` | `@`         | `2606:50c0:8003::153`  |

With `www.emmastephensonmusic.com` set as the custom domain, GitHub redirects the
apex to `www` automatically.

If your DNS host supports `ALIAS`/`ANAME`/flattened-CNAME records at the apex
(Cloudflare, DNSimple, Route 53 and others do), a single
`ALIAS @ → emmagrace91.github.io` is tidier than the eight records above.

### Checking it worked

```bash
dig +short www.emmastephensonmusic.com
```

You should see `emmagrace91.github.io` followed by the four `185.199.*` IPs.
DNS changes usually appear within an hour but can take up to 48.

**Cloudflare users:** set the `www` record to **DNS only** (grey cloud), not
proxied, until GitHub has issued the certificate. Leaving the orange cloud on
blocks GitHub's domain verification.

---

## Project structure

```
public/
  CNAME                 the custom domain, copied into dist/ on every build
  images/               logo + photos (placeholders for now)
src/
  components/           one file per page section
  layouts/Layout.astro  <head>, meta tags, global CSS
  pages/index.astro     the single landing page
  styles/global.css     palette, type, buttons, shared layout
  content.ts            all page copy
  site.ts               links, image paths, site metadata
.github/workflows/
  deploy.yml            build + publish to GitHub Pages
```

## Design tokens

Defined as CSS custom properties at the top of `src/styles/global.css`:

| Token     | Value     | Used for                        |
| --------- | --------- | ------------------------------- |
| `--cream` | `#f7f3ee` | page background                 |
| `--ink`   | `#2a2420` | headings and body text          |
| `--muted` | `#6b5e54` | secondary text                  |
| `--wine`  | `#8b3a3a` | accent, buttons, the CTA band   |
| `--card`  | `#fffdf9` | cards and figures               |
| `--line`  | `#e5dcd2` | borders and section rules       |

Headings are Palatino/Iowan-style serif; body is the system sans stack. No web
fonts are loaded, so there is nothing to wait on and no third-party requests.
