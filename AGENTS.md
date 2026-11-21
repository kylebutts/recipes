# Agent notes

## Commands

- Node.js 22.23.4 or newer.
- `npm run check` then `npm run build`.
- The production site is the committed `docs/` directory. Rebuild it before committing and push source and `docs/` together.

## Recipes

- Add recipes in `src/content/recipes/<slug>.mdx`. The filename becomes the page URL.
- `number` is required, unique, and permanent. Use the next unused number. It also creates `/<number>.html`.
- Frontmatter fields: `title`, `number`, `category`, `time`, `description`, `size`, `author`, `website`, `source`, `original_title`, `tags`.
- Set `website` to the publication/site name (for example `NYTimes Cooking`), not the domain.
- The source credit renders under the title/description as `Author ⋅ Website` and links to `source`. Do not add a `Source:` prefix. If the author and website are the same, show the name once.
- Use the existing structure: `<div className="recipe-columns">` containing `<section className="ingredients">` and `<section className="instructions">`, with each step in `<div className="recipe-step">`.
- Include the relevant ingredient amounts inside each instruction step as a bullet list with backticked amounts, matching the existing recipes.
- Notes belong in the right column at the end of the instructions section, inside `<section className="thoughts">`.
- Do not use recipe images or an `image` frontmatter field.

## Fractions

- Write mixed numbers with a hyphen and an ASCII fraction: `1-3/4`, `1-1/2`, `3/4`, `1/2`.
- Do not use `1 ¾`, `1 3/4`, or other space-separated/unformatted fractions.

## Layout and print

- Ingredients and instructions headers share the same bottom spacing.
- In print, the recipe is a single column, but time/yield stay to the right of the title.
- Print gives the highlighted title extra padding (`8px`).
- Checked ingredients and completed steps must print as unchecked:
  - Ingredient checkmarks are hidden in print.
  - Step badges print their step number, not `[x]`.
  - Use print-only CSS for this; do not mutate checklist state before printing.

## Theme

- Accent colors are defined in `src/styles/global.css` as `--kyle-<color>` and `--kyle-<color>-soft`, with matching `:root[data-theme="<color>"]` rules.
- To add a color, also add it to the `themes` list in `src/layouts/Layout.astro` and add a matching `public/favicon/favicon_kyle-<color>.png`.
- Text selection uses the active theme's soft color (`var(--theme-soft)`).
- Ingredient checkmarks are 1.5em and vertically centered against the ingredient text.
