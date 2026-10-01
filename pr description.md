# feat: ByteSpace landing page + login and signup

## Summary

Builds the ByteSpace marketing site from the Figma design in Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion. The full spec is in `docs/PRD.md`.

### Pages
- `/`: the landing page, with navbar, hero (search and floating stat cards), partner logos, course discovery (category filter and a 3×2 course grid), learning paths, professional growth stats, creator tools, creator CTA banner, testimonials and footer.
- `/login` and `/signup` (bonus): a blue-grid auth layout with an animated card collage and a form panel with client-side validation, loading and success states.

### Structure
- `components/ui`: primitives (Button, Chip, Pill, FormField, AvatarStack, Rating, Container, SectionHeading)
- `components/cards`: reusable CourseCard, ProgressCard, HappyStudentsCard, TopicCard, RevenueCard, TestimonialCard, CategoryTile
- `components/shapes`: the design's 3D decorations as scalable SVGs
- `components/motion`: Reveal, Stagger, Float, CountUp, and a MotionProvider that respects reduced motion
- `components/sections/home`: one file per landing section
- `data/`: all content and image URLs, typed

### Motion
Scroll reveals with staggered grids, a sequenced hero intro, floating 3D shapes and cards, animated progress bars, count-up stats, an animated mobile menu and a sliding auth panel. All motion turns off when the user prefers reduced motion.

## Notes
- The photos are Unsplash and randomuser placeholders, and the 3D objects are SVG recreations, because the Figma file is view-only. To swap in the Figma exports, change `src/data/media.ts`.
- The design copy is kept as-is. The copy fixes suggested to the designer are listed in PRD §9.

## Checklist
- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] Desktop, tablet and mobile checked