# HE AI Data Centre — heaidatacentre.com

Corporate website for **HE AI Data Centre**, a hyperscale AI data centre campus in
Bentong, Pahang Darul Makmur, Malaysia. Design language inspired by leading
hyperscale operators, with a visual identity rooted in Pahang: rainforest emerald,
royal gold (Darul Makmur), steel silver, a Tenun Pahang Diraja-inspired weave motif,
and the white-over-black colours of the Pahang flag.

## Structure

- `index.html` — single-page site (hero, about, why Bentong, campus specs, sustainability, Pahang heritage, connectivity, contact)
- `css/style.css` — design system and layout
- `js/main.js` — mobile nav, stat counters, scroll reveals
- `assets/logo.png` — the HE mark, web-sized from the supplied artwork (master kept as `assets/logo-original.png`)
- `assets/favicon.png` — favicon generated from the same artwork
- `CNAME` — custom domain for GitHub Pages (`heaidatacentre.com`)

## Local preview

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Deploy (GitHub Pages)

Enable GitHub Pages for this repository (Settings → Pages → deploy from branch),
point it at the branch root, and point `heaidatacentre.com`'s DNS at GitHub Pages.
The `CNAME` file is already in place.
