# wheelie-blog

A personal blog by Tom Easterbrook, sharing personal experiences in adult social
care, local government, and other topics.

This repository hosts a static site — a single-page blog built with plain HTML,
[Tailwind CSS](https://tailwindcss.com/) and [Alpine.js](https://alpinejs.dev/)
(both loaded via CDN, so there's no build step).

## Running it

It's a static site, so just open `index.html` in a browser. For a local server:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Features

- Single-page layout: hero, writing list, about, and subscribe sections
- Animated caricature hero image (see `assets/README.md`)
- Dark mode toggle (remembers your choice, respects system preference)
- Category filtering and expandable posts, powered by Alpine
- Fully responsive

## Adding your caricature

Drop your animated caricature into `assets/caricature.gif`. Until then, a
placeholder is shown in its place. Posts live in the `posts` array inside the
`<script>` at the bottom of `index.html`.

## .gitignore

A simple `.gitignore` suited to a static site is included:

```gitignore
# Build output
/dist/
/_site/
/public/build/

# Dependencies
/node_modules/

# Environment / secrets
.env
.env.local

# OS / editor cruft
.DS_Store
Thumbs.db
*.swp
.idea/
.vscode/

# Logs
*.log
npm-debug.log*
```
