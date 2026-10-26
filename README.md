# Jellyfish – Aayush Aryan's portfolio

React 19 + Vite + Tailwind CSS v4, with GSAP ScrollTrigger and Lenis. Deployed on Vercel.

```bash
npm install     # install dependencies
npm run dev     # local dev server at http://localhost:5173
npm run build   # production build into dist/
```

## Editing content
All copy, stats, links and projects live in `src/data/content.js`.

## Adding the Higgsfield videos
1. Put encoded clips in `public/assets/video/` (see BUILD-PLAN.md §5 for ffmpeg commands).
2. Set the path in `videos` inside `src/data/content.js`, e.g. `hero: '/assets/video/hero-jellyfish.mp4'`.
Until a path is set, each slot renders a live canvas jellyfish instead.

`Media/` holds the identity reference photo for Higgsfield and is git-ignored.
