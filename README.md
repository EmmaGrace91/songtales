# Songtales

Static landing page for **Songtales** — personal songs written by Emma Stephenson.
Built with [Astro](https://astro.build), deployed to GitHub Pages at
**https://songtales.emmastephensonmusic.com**.

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

### The photos

The real photos live in `public/images/` and are wired up in `IMAGES` in
`src/site.ts`:

| `IMAGES` key | File                             | Frame                                    |
| ------------ | -------------------------------- | ---------------------------------------- |
| `hero`       | `hero-portrait.jpg` (800×1200)   | 4:5 on desktop, 5:4 on mobile            |
| `aboutCraft` | `about-piano.jpg` (1200×800)     | 3:2 — matches the file, so it isn't cropped |
| `aboutLife`  | `about-family.jpg` (800×1200)    | 4:5 on desktop, 3:4 on narrow screens    |
| `logo`       | `logo.jpg` (720×720)             | square crop of the emblem, masked to a circle |

Every photo uses `object-fit: cover` with `object-position: top center`, so the
crop always takes from the bottom and heads stay in frame at any width. The `img`
elements carry their real intrinsic `width`/`height` so nothing shifts while
loading — **if you swap a photo for one with different dimensions, update those
attributes too**, or the layout will jump. Update `IMAGE_ALT` in `src/site.ts` to
match whatever you drop in.

`assets-source/` holds original files that aren't used on the site (the
uncropped wide logo, alternate studio shots). It's gitignored, so nothing in
there is published.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. Nothing else to run.

### One-time GitHub Pages setup

1. Go to **Settings → Pages** in this repo.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   (Not "Deploy from a branch" — this repo deploys via the workflow.)
3. Under **Custom domain**, enter `songtales.emmastephensonmusic.com` and save.
   `public/CNAME` already contains this, so GitHub should pick it up on the first
   deploy; setting it in the UI as well is harmless and makes it explicit.
4. Once the DNS check passes, tick **Enforce HTTPS**. This can take up to 24 hours
   while GitHub provisions the TLS certificate — the tickbox is greyed out until
   it's ready.

Watch the deploy under the **Actions** tab.

---

## DNS setup for `songtales.emmastephensonmusic.com`

The site lives on its **own subdomain**, deliberately. `emmastephensonmusic.com`
and `www.emmastephensonmusic.com` are left exactly as they are — they still point
at the existing page that forwards to Linktree. Songtales sits alongside it, so
it can be added to Linktree as its own link.

Set this at Namecheap, which manages DNS for `emmastephensonmusic.com`.

| Type    | Host        | Value                    | TTL       |
| ------- | ----------- | ------------------------ | --------- |
| `CNAME` | `songtales` | `emmagrace91.github.io.` | Automatic |

Add it as a **new** record. Do not edit or delete the existing `www` CNAME or the
`@` A records — those belong to the Linktree page.

Note the target is the GitHub Pages hostname (`emmagrace91.github.io`), not the
repo name and not an IP address. Some DNS panels want a trailing dot; some add it
for you. Both forms are fine.

### Checking it worked

```bash
dig +short songtales.emmastephensonmusic.com
```

You should see `emmagrace91.github.io` followed by four `185.199.*` addresses.
DNS changes usually appear within an hour, occasionally up to 48.

**Cloudflare users:** not applicable here — this domain is on Namecheap's own
nameservers (`dns1/dns2.registrar-servers.com`).

### Why a subdomain rather than `www`

A custom domain can only be claimed by one GitHub repository at a time, and
`www.emmastephensonmusic.com` is already claimed by another repo. Using a
distinct hostname sidesteps that entirely, and leaves the existing site alone.

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
