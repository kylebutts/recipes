# Kyle's cookbook

A static Astro website with MDX recipes and a paper-and-monospace design based on the supplied TXT/RECIPES theme.

## Development

Use Node.js 22.23.4 or newer.

```sh
npm install
npm run dev
```

```sh
npm run check
npm run build
npm run preview
```

The production build goes into `docs/` for GitHub Pages. The site is built with `base: "/recipes/"` in `astro.config.mjs`, so it is served from `kylebutts.github.io/recipes/` and reaches the public site at `kylebutts.com/recipes/`. Existing recipe addresses such as `banh_mi.html` stay the same, just under the new prefix.

`kylebutts.com` is a separate Astro site on Netlify. Its `public/_redirects` proxies `/recipes/*` to `https://kylebutts.github.io/recipes/:splat` with a status of 200, so the URL stays on `kylebutts.com` while the recipes repo keeps deploying independently. If the recipes site ever moves, only that redirect needs updating.

## Add a recipe

Create `src/content/recipes/your_recipe.mdx`. The filename becomes its URL, `your_recipe.html`.

```mdx
---
title: Example recipe
number: 14
category: Dinner
time: 30 minutes
size: 4 servings
description: A short description of the dish.
tags: []
---

<div className="recipe-columns">

<section className="ingredients">

## [+] Ingredients

* `2 tbsp` olive oil

</section>

<section className="instructions">

## [>] Instructions

<div className="recipe-step">

Heat the oil in a pan.

</div>

</section>

</div>
```

`number` is required and becomes the recipe's permanent label, shown as `REC-019` on the index and recipe page. It also creates a short URL: `/recipes/019.html` redirects to the recipe. Numbers are assigned in the order recipes were added: give each new recipe the next unused number. Numbers must be unique, since the build fails on duplicates. The index still sorts A–Z by title, so numbers do not affect display order. Optional frontmatter includes `author`, `source` (a full URL), `image` (a filename in `public/images/`), and `original_title`. Categories and tags automatically appear in the index filters. Search includes the full recipe text. Each `recipe-step` gets a completion checkbox when JavaScript is enabled.

All 16 original recipes retain their ingredients, instructions, attribution, and available photos. Recipe content and navigation work without JavaScript; search, layout switching, copy, and checkboxes use small client scripts. Compact text is the default; the grid/compact preference is saved in the browser.

The old Pandoc build, templates, and duplicate recipe sources have been replaced by Astro. Edit recipes in `src/content/recipes/`, then rebuild `docs/` before publishing. No deployment happens automatically.
