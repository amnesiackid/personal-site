# Personal site — Zhiyu Bao

Plain HTML, CSS, and vanilla JS. No build step, no dependencies, no framework.
Open the files in any editor and they are what ships.

```
index.html      all the content — each section has an EDIT comment above it
styles.css      all the styling — theme variables are in the :root block at the top
main.js         mobile menu, active-section highlighting, footer year
assets/
  portrait.jpg  hero photo, cropped to 4:5 (900x1125)
```

The CV is **not** published as a file. The CV section links to a pre-filled
`mailto:` instead, so the PDF goes out by email rather than sitting at a public
URL. To publish it as a direct download later: drop the PDF at
`assets/CV_ZhiyuBao.pdf`, then swap the "Request my CV" button for the
commented-out "Download CV" block just below it in `index.html`.

## Preview it locally

```bash
python -m http.server 8137
```

Then open <http://localhost:8137>. Opening `index.html` directly by
double-clicking also works, but the local server matches how it will behave once
it is hosted.

## Changing the theme

Everything visual is driven by the `:root` block at the top of `styles.css`:

- **Accent colour** — edit `--accent` (currently `#9a3f21`, a terracotta). Also
  edit `--accent` inside the dark-mode block at the bottom of the file, which
  uses a lighter tint so it stays readable on a dark ground.
- **Fonts** — edit `--font-serif`, `--font-sans`, `--font-mono`, and update the
  Google Fonts `<link>` in `index.html` to load whichever families you picked.
- **Background and text** — `--paper`, `--ink`, `--ink-muted`, `--rule`.

## Before publishing

- Replace `[YOUR-SITE-URL]` in `index.html` (canonical link, Open Graph tags,
  and the JSON-LD block) with the real address.
- Fill in the `[Month Year]` date in the footer.
- Replace or delete the bracketed availability line in the Contact section.
- Add the repository link to the TimesFM project (`[LINK-TO-REPO]`).
- Optional: swap `og:image` for a proper 1200x630 preview image.

## Turning on the Publications section

It is commented out in `index.html` rather than left empty. Search for
`PUBLICATIONS`, delete the two comment markers wrapping the `<section>`, and
uncomment the matching `<li>` in the nav. The CSS for it is already written.

## Hosting

Any static host works, since there is nothing to build. Drop the folder on
GitHub Pages, Netlify, or Cloudflare Pages as-is.
