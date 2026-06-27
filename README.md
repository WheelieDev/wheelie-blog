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

- **`index.html`** — single-page home: hero, writing index, about
- **`article.html`** — newspaper-style article page, rendered from markdown
- Dark mode toggle (remembers your choice, respects system preference)
- Category filtering on the home page, powered by Alpine
- Fully responsive

> **Note:** because article pages `fetch()` markdown files, the site must be
> served over `http://` (e.g. `python3 -m http.server`, or GitHub Pages).
> Opening `index.html` directly with `file://` will block those fetches.

## Writing articles

Each essay is a markdown file in [`posts/`](posts/), named `<slug>.md`. It opens
with a small YAML-style front-matter block, then the article body in markdown:

```markdown
---
title: What 'person-centred' actually means at 7am
category: Adult Social Care
author: Tom Easterbrook
date: 12 Jun 2026
read: 5 min
dek: A one-line standfirst shown under the headline.
image: assets/some-photo.jpg   # optional lead image
caption: Optional caption       # optional
---

Your article in **markdown** — headings, _emphasis_, lists, > blockquotes
(rendered as newspaper pull-quotes), links and images all work.
```

`article.html?post=<slug>` loads `posts/<slug>.md`, parses the front-matter, and
renders the body in a multi-column newspaper layout (masthead, drop cap,
justified columns, hairline rules).

To add a post: create `posts/<slug>.md`, then add an entry (with the same
`slug`) to the `posts` array in the `<script>` at the bottom of `index.html` so
it shows up in the home-page index.

## Adding your caricature

Your caricature lives at `assets/caricature.png`. If it's missing, a
placeholder is shown in its place.

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
