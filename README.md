# ByteSpace

Front end for **ByteSpace**, an online course marketplace for learners and creators, built from the
"ByteSpace New Check website" Figma file. The product spec is in [`docs/PRD.md`](docs/PRD.md).

**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Framer Motion 12 · lucide-react

![Landing page](docs/screenshots/home.jpg)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start the dev server            |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |
| `npm run lint`      | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit`                  |

## Pages

| Route              | Figma frame                                | Notes                                                                   |
| ------------------ | ------------------------------------------ | ----------------------------------------------------------------------- |
| `/`                | Home                                       | 10 sections, scroll animations                                          |
| `/courses`         | Search Page                                | `?q=` search, `?in=courses\|creators` scope, `?page=` pagination         |
| `/courses/[slug]`  | Course Detail / Course Lessons / Reviews   | About · Lessons · Reviews tabs, sticky enrol card, review star filter   |
| `/creators/[slug]` | Creator Profile                            | Header, follow toggle, the creator's courses                            |
| `/login`           | Login                                      | Client-side validation, social buttons                                  |
| `/signup`          | Register                                   | Client-side validation                                                  |
| any unknown URL    | 404 Not Found                              | Also rendered for unknown course / creator slugs                        |

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # fonts, metadata, MotionProvider
│   ├── globals.css             # Tailwind v4 @theme tokens + utilities
│   ├── not-found.tsx           # 404 page
│   ├── (site)/                 # pages with the navbar + footer shell
│   │   ├── page.tsx            # landing page = composition of sections
│   │   ├── courses/            # search page and course detail
│   │   └── creators/[slug]/    # creator profile
│   └── (auth)/                 # login and signup on the shared blue auth shell
├── components/
│   ├── layout/                 # Navbar, Footer, Logo, SiteShell, NewsletterForm
│   ├── sections/<page>/        # one file per page section
│   ├── courses/                # CourseGrid, CategoryFilter, CourseToolbar
│   ├── cards/                  # CourseCard, ProgressCard, HappyStudentsCard, ...
│   ├── auth/                   # AuthShowcase, AuthPanel, AuthForm, SocialSignIn
│   ├── ui/                     # Button, Chip, Pill, Tabs, FormField, Pagination, ...
│   ├── shapes/                 # 3D decorative SVGs + floating Decorations layer
│   └── motion/                 # Reveal, Stagger, Float, CountUp, MotionProvider
├── data/                       # typed content: courses, creators, navigation, media, ...
├── lib/                        # cn(), catalogue search, form validation
└── types/                      # shared TypeScript types
```

### Conventions

- **Server Components by default.** `"use client"` is only used where there is state or animation.
- **Content lives in `src/data/`.** Components never hard-code lists.
- **All image URLs live in `src/data/media.ts`.** Swap in the Figma exports there.
- **Design tokens** (colours, radii, shadows, fonts) are defined once in `globals.css` with `@theme`
  and used as Tailwind classes (`bg-brand`, `text-ink`, `rounded-card`, ...).
- **Motion** respects `prefers-reduced-motion` through `MotionConfig reducedMotion="user"`.

## Assets

The Figma file is view-only, so the original assets could not be exported:

- Photos are Unsplash placeholders. The two cut-out portraits in `public/images/people/` were made
  from Unsplash photos for this build.
- The 3D objects (squiggle, cylinder, cone, torus) are SVG recreations in `src/components/shapes/`.

To use the real assets, export them from Figma into `public/images/` and update `src/data/media.ts`.
