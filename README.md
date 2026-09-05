# Personal site — Zhiyu Bao

Plain HTML, CSS, and vanilla JS. No build step, no dependencies, no framework.
Open the files in any editor and they are what ships.

Live at <https://amnesiackid.github.io/personal-site/>

```
index.html        English — the primary version
de/index.html     German translation
zh/index.html     Chinese translation
styles.css        shared by all three pages
main.js           shared by all three pages
assets/
  portrait.jpg    hero photo, cropped to 4:5 (900x1125)
```

## Languages

English is the primary version. That is stated three ways: the `main` tag beside
English in the language dropdown, a notice bar at the top of the translated pages,
and `hreflang="x-default"` pointing at the English page for search engines.

The dropdown is a `<details>` disclosure holding real `<a>` links, not a
`<select>`. That means it opens and closes without JavaScript, middle-click and
open-in-new-tab work, search engines can follow the links, and arrowing through
the options does not navigate before you have chosen. main.js only adds Escape
and click-outside.

**The design forks nowhere.** `styles.css` and `main.js` live at the top level and
the translated pages reference them as `../styles.css` and `../main.js`. Change
the accent colour once and all three pages follow. Only the prose is duplicated.

Three rules keep the pages working together:

1. **Section ids are identical across languages** (`#about`, `#research`, …).
   The nav, the scroll-spy, and the language switcher all depend on this. Translate
   the visible link text, never the `id` or the `href`.
2. **Paths are relative**, so the site keeps working if it moves to a custom
   domain or a different folder.
3. **Absolute URLs only in `<head>`** — the `canonical`, `hreflang`, and Open
   Graph tags. If the address changes, those are the lines to update, in all
   three files.

Switching language keeps your place: read `#projects` in English, click DE, and
you land on `#projects`.

### Adding a language

Copy `de/index.html` to a new folder, then update: `<html lang>`, the `<title>`
and meta description, the `canonical` and `og:url`, the `aria-current="page"`
in the language dropdown, and the notice bar. Then add one `<link rel="alternate"
hreflang="…">` line to **all** the other pages, and one `<li>` to each language
dropdown. Chinese-style scripts also need a `html[lang^="…"]` font block in
`styles.css` — see the one for `zh`.

### Keeping translations honest

When you change content in `index.html`, change it in `de/` and `zh/` too, or
they drift. A stale translation reads worse than no translation. The notice bar
is there so a reader who finds a discrepancy knows which version wins.

Deliberately **not** translated: repository names, tech stacks, course titles
(Stuttgart teaches them under English names), and the research lab's name.

## The CV

Not published as a file. The site has no CV section; the Contact section invites
email instead, so the PDF goes out personally rather than sitting at a public URL.

## Preview it locally

```bash
python -m http.server 8137
```

Then open <http://localhost:8137>. Use the server rather than double-clicking
`index.html`, so that the `de/` and `zh/` paths resolve the way they will once
hosted.

## Changing the theme

Everything visual is driven by the `:root` block at the top of `styles.css`:

- **Accent colour** — edit `--accent` (currently `#9a3f21`, a terracotta). Also
  edit `--accent` inside the dark-mode block near the bottom, which uses a
  lighter tint so it stays readable on a dark ground.
- **Fonts** — edit `--font-serif`, `--font-sans`, `--font-mono`, and update the
  Google Fonts `<link>` in each of the three HTML files. The Chinese page adds
  CJK fallbacks in the `html[lang^="zh"]` block just below `:root`.
- **Background and text** — `--paper`, `--ink`, `--ink-muted`, `--rule`.

One thing to know: `--header-h` is not decorative. Anchor offsets and the
translation notice bar are measured against it, so if you change the header's
height, change that variable to match.

## Turning on the Publications section

Commented out in `index.html` rather than left empty. Search for `PUBLICATIONS`,
delete the two comment markers wrapping the `<section>`, and uncomment the
matching `<li>` in the nav. The CSS is already written.

## Hosting

Served by GitHub Pages from `main`, no build step. Any static host works the
same way.
