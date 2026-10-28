# Architecture

## Stack

React 19 with Vite 6. The deployment-ready static build configuration is preserved from the Product Design prototype template.

## Composition

- `src/App.jsx`: page sections, navigation, theme state, and content arrays.
- `src/styles.css`: design tokens, theme overrides, responsive layout, and motion/accessibility rules.
- `public/assets/`: original generated raster schematic illustrations.

## Data model direction

Project content should move from inline starter content to a `src/data/projects.js` module when more than one verified project is available. Each record should include a stable id, slug, title, summary, approved status, category, verified technologies, actual role, problem, approach, limitations, next steps, links, media, and featured flag.

## Key decisions

No router, CMS, database, animation package, or icon dependency was added. The current evidence supports a lightweight static portfolio; richer structure should follow real project content, not precede it.
