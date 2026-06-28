# wheelie-blog

A personal blog by Tom Easterbrook, sharing personal experiences in adult social
care, local government, and other topics.

This repository hosts a static site — a single-page blog built with plain HTML,
[Tailwind CSS](https://tailwindcss.com/) (via CDN) and [Alpine.js](https://alpinejs.dev/).
Alpine and the page logic are bundled as ES modules with [Vite](https://vitejs.dev/).

## Project layout

```
index.html          home page (Vite entry)
article.html        article page (Vite entry)
src/
  main.js           entry: registers Alpine components + imports styles
  a11y.js           shared accessibility component (theme / typeface / size)
  blog.js           home-page component (x-data="blog")
  article.js        article-page component (x-data="article")
  styles.css        all custom CSS
public/
  posts/<slug>.md   the essays (served at /posts/…)
  assets/           caricature image, etc.
```

## Running it

```sh
npm install      # first time only
npm run dev      # start the dev server (prints a localhost URL)
```

To produce the static site for hosting:

```sh
npm run build    # outputs to dist/
npm run preview  # serve the built dist/ to check it
```

Deploy the contents of `dist/` to any static host (e.g. GitHub Pages).

## Features

- **`index.html`** — single-page home: hero, writing index, about
- **`article.html`** — newspaper-style article page, rendered from markdown
- **Accessibility panel** (floating button, every page): adjust **text size**,
  **typeface** (Serif / accessible Sans — Atkinson Hyperlegible / dyslexia-friendly
  OpenDyslexic), and **background** (Light / Sepia / Dark / High-contrast). Choices
  persist across pages and respect the system dark-mode preference by default.
- Category filtering on the home page, powered by Alpine
- Fully responsive

> **Note:** because article pages `fetch()` markdown files, the site must be
> served over `http://` (the Vite dev server, `npm run preview`, or any static
> host). Opening the HTML directly with `file://` will block those fetches.

## Writing articles

Each essay is a markdown file in [`public/posts/`](public/posts/), named
`<slug>.md`. It opens with a small YAML-style front-matter block, then the
article body in markdown:

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
renders the body in a single-column newspaper layout (masthead, drop cap,
justified text, pull-quotes, hairline rules).

To add a post: create `public/posts/<slug>.md`, then add an entry (with the same
`slug`) to the `posts` array in [`src/blog.js`](src/blog.js) so it shows up in
the home-page index.

## Adding your caricature

Your caricature lives at `public/assets/caricature.png`. If it's missing, a
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
