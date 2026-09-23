# Yuchong Zhang — personal website

A single-page, dependency-free academic homepage (plain HTML + CSS + a little JS).
No build step, no framework: edit the HTML, refresh, done.

```
index.html   ← all content lives here
style.css    ← design tokens (colours, fonts) at the top in :root
script.js    ← dark-mode toggle, mobile menu, publication filters, "show more"
assets/      ← put photo.jpg and Yuchong_Zhang_CV.pdf here
```

## Publish on GitHub Pages (≈5 minutes)

1. Create a GitHub account if you don't have one, then create a **new public repository**
   named exactly `<your-username>.github.io` (e.g. `yuchongzhang.github.io`).
   That name makes GitHub serve it at `https://<your-username>.github.io/`.
2. Upload these files to the repository root (drag-and-drop on github.com works:
   *Add file → Upload files*). `index.html` must be at the top level.
3. Go to **Settings → Pages**. Under *Build and deployment* choose
   **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Wait 1–2 minutes. Your site is live at `https://<your-username>.github.io/`.
   Every later commit to `main` redeploys automatically.

### Optional: custom domain (e.g. yuchongzhang.com)
Buy the domain from any registrar, add it under *Settings → Pages → Custom domain*,
and create the DNS records GitHub shows you (four `A` records + one `CNAME` for `www`).
Tick *Enforce HTTPS* once the certificate is issued.

## Editing content

**Photo** — save your headshot as `assets/photo.jpg` (portrait, ~600×700 px), then in
`index.html` delete the `<div class="placeholder">…</div>` line and un-comment the `<img …>` above it.

**CV** — save as `assets/Yuchong_Zhang_CV.pdf` and change the CV chip's `href` to `assets/Yuchong_Zhang_CV.pdf`.

**News** — add a new `<li>` at the top of `<ul class="news">`. Items with `data-more="news" hidden`
are collapsed behind the *Show older news* button.

**Publications** — copy any `<li class="pub">` block and edit. Set `data-type` to
`conference` or `journal`, and `data-award="true"` for award-winning papers (drives the filters).
Add PDF / DOI / video links inside the entry, e.g.
`<div class="plinks"><a href="papers/foo.pdf">PDF</a><a href="https://doi.org/…">DOI</a></div>`.
Give an entry an `id` if you want to link to it from a news item (`href="#pub-…"`).

**Colours & fonts** — change the variables at the top of `style.css`. `--accent` is the main
colour; the dark theme has its own block just below.

## Notes
- Dark mode follows the visitor's system setting and can be toggled with the moon/sun button;
  the choice is remembered in the browser.
- Fonts (Newsreader + Inter) load from Google Fonts; if they are blocked the page falls back to
  system serif/sans and still looks fine.
- Everything is static, so it also works offline: just open `index.html` in a browser.
