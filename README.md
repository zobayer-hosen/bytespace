# ByteSpace

Front end for **ByteSpace**, an online course marketplace where learners find courses and creators publish
them. It is built from the "ByteSpace New Check website" Figma file with Next.js 15, TypeScript, Tailwind CSS v4
and Framer Motion.

![ByteSpace landing page](https://raw.githubusercontent.com/zobayer-hosen/bytespace/feature/landing-page/docs/screenshots/home.jpg)

The full product spec (design tokens, page requirements, motion spec, open questions) is in the
[PRD](https://github.com/zobayer-hosen/bytespace/blob/feature/landing-page/docs/PRD.md).

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Pages and routes](#pages-and-routes)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Design system](#design-system)
- [Conventions](#conventions)
- [Before opening a pull request](#before-opening-a-pull-request)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Known limitations](#known-limitations)
- [Screenshots](#screenshots)

## Features

- **Landing page** with ten sections from the Figma design: hero with search, partner logos, course discovery,
  learning paths, growth stats, creator tools, creator call to action, testimonials and footer.
- **Category chips** on the landing page filter the course grid in place. The first 8 chips are shown, "+ More"
  reveals the rest, and the grid animates when the results change.
- **Course search** (`/courses`) with search, Filter / Level / Category / sort controls, category chips and
  pagination. Every option is kept in the URL, so a filtered view can be shared or reloaded.
- **Course detail** page with About, Lessons and Reviews tabs, a sticky enrol card and a review star filter.
- **Creator profile** with a follow toggle and the creator's courses, using the same filters and sorting.
- **Login and sign-up** forms with client-side validation, loading and success states.
- **Custom 404** page, also shown for unknown course or creator links.
- **Responsive** from 320px phones to wide desktops, with no horizontal scrolling.
- **Accessible**: semantic landmarks, labelled controls, keyboard support for menus and tabs, visible focus
  rings, screen-reader announcements for filter results.
- **Motion** (scroll reveals, floating shapes, count-ups, animated grid) that switches off for visitors who
  prefer reduced motion.

## Tech stack

| Area      | Choice                                                                |
| --------- | --------------------------------------------------------------------- |
| Framework | [Next.js](https://nextjs.org) 15 (App Router), React 19               |
| Language  | TypeScript, strict mode                                               |
| Styling   | [Tailwind CSS](https://tailwindcss.com) v4, design tokens in CSS      |
| Animation | [Framer Motion](https://motion.dev) 12                                |
| Icons     | [lucide-react](https://lucide.dev)                                    |
| Fonts     | Poppins (headings) and Inter (body), self-hosted with `next/font`     |
| Utilities | `clsx` + `tailwind-merge` (the `cn()` helper)                         |
| Quality   | ESLint (`next/core-web-vitals`), `tsc --noEmit`                       |

There is no backend: all content comes from typed data files in `src/data/`.

## Getting started

**Requirements:** Node.js 18.18 or newer (tested with Node 24) and npm. No environment variables are needed.

```bash
git clone https://github.com/zobayer-hosen/bytespace.git
cd bytespace
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Scripts

| Command             | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Start the development server with hot reload      |
| `npm run build`     | Create an optimised production build in `.next/`  |
| `npm run start`     | Serve the production build (run `build` first)    |
| `npm run lint`      | Lint the project with ESLint                      |
| `npm run typecheck` | Type-check the project with TypeScript            |

## Pages and routes

| Route              | Page                       | Notes                                                                    |
| ------------------ | -------------------------- | ------------------------------------------------------------------------ |
| `/`                | Landing page               | Category chips filter the course grid in place                           |
| `/courses`         | Course search              | URL options: `q`, `in` (`courses` or `creators`), `category`, `level`, `sort`, `page` |
| `/courses/[slug]`  | Course detail              | About · Lessons · Reviews tabs                                           |
| `/creators/[slug]` | Creator profile            | URL options: `category`, `level`, `sort`                                 |
| `/login`           | Sign in                    | Client-side validation only, nothing is sent                             |
| `/signup`          | Sign up                    | Client-side validation only, nothing is sent                             |
| any other URL      | 404 page                   | Also used for unknown course or creator slugs                            |

Example: `/courses?q=figma&category=ui-ux-design&level=beginner&sort=title`.

Sort options are Most relevant, Most popular, Highest rated and Title (A–Z). Levels are Beginner,
Intermediate and Advanced.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                # fonts, metadata, MotionProvider
│   ├── globals.css               # Tailwind v4 @theme tokens and utilities
│   ├── not-found.tsx             # 404 page
│   ├── robots.ts
│   ├── (site)/                   # pages with the navbar + footer
│   │   ├── page.tsx              # landing page, composed from sections
│   │   ├── courses/              # search page and course detail
│   │   └── creators/[slug]/      # creator profile
│   └── (auth)/                   # login and sign-up on the blue auth layout
├── components/
│   ├── layout/                   # Navbar, Footer, Logo, SiteShell, NewsletterForm
│   ├── sections/                 # one folder per page, one file per section
│   │   ├── home/  courses/  course/  creator/  not-found/
│   ├── courses/                  # course grids, category chips, toolbar, filter panel, URL filter state
│   ├── cards/                    # CourseCard, ProgressCard, TestimonialCard, ReviewCard, ...
│   ├── auth/                     # AuthPanel, AuthForm, AuthShowcase, SocialSignIn
│   ├── ui/                       # Button, Chip, Pill, Tabs, Popover, SelectMenu, FormField, Pagination, ...
│   ├── shapes/                   # 3D decorations drawn as SVG
│   └── motion/                   # Reveal, Stagger, Float, CountUp, MotionProvider
├── data/                         # all site content, typed
├── lib/                          # cn(), catalogue search, course filters and sorting, form validation
└── types/                        # shared TypeScript types
public/images/people/             # cut-out portraits used on the landing page
```

## Editing content

All text, lists and images live in `src/data/`, so most content changes need no component edits.

| To change…                                          | Edit                                                     |
| --------------------------------------------------- | -------------------------------------------------------- |
| Courses (title, level, price, categories, featured) | [`src/data/courses.ts`](src/data/courses.ts)             |
| Category chips and learning-path tiles              | [`src/data/categories.ts`](src/data/categories.ts)       |
| Course detail page (lessons, modules, reviews)      | [`src/data/course-detail.ts`](src/data/course-detail.ts) |
| Creators                                            | [`src/data/creators.ts`](src/data/creators.ts)           |
| Landing page copy (stats, testimonials, partners)   | [`src/data/home.ts`](src/data/home.ts)                   |
| Navbar and footer links                             | [`src/data/navigation.ts`](src/data/navigation.ts)       |
| Login and sign-up fields                            | [`src/data/auth.ts`](src/data/auth.ts)                   |
| Every image URL                                     | [`src/data/media.ts`](src/data/media.ts)                 |

A course appears under a category chip when that category is in its `categories` array, and under
"Featured" when `featured` is `true`. Category names are typed, so a misspelt category fails the type check.

Remote images must come from an allowed host. `images.unsplash.com` is allowed in
[`next.config.ts`](next.config.ts); add any new host there.

## Design system

Tokens are defined once with `@theme` in [`src/app/globals.css`](src/app/globals.css) and used as Tailwind
classes, for example `bg-brand`, `text-ink` or `rounded-card`.

| Token        | Value     | Used for                                   |
| ------------ | --------- | ------------------------------------------ |
| `brand`      | `#0B3BF5` | Blue hero, banners, links, prices          |
| `brand-600`  | `#0831D0` | Blue hover states                          |
| `accent`     | `#D4F531` | Lime buttons, active chips, highlights     |
| `accent-600` | `#C2E31F` | Lime hover states                          |
| `ink`        | `#101223` | Headings and body text                     |
| `muted`      | `#6B6F80` | Secondary text                             |
| `surface`    | `#F4F4F6` | Grey chips and panels                      |
| `mist`       | `#F7F8FB` | Soft section backgrounds                   |
| `line`       | `#E6E7EC` | Borders and dividers                       |

Radii: `rounded-inset` (14px), `rounded-card` (20px), `rounded-panel` (24px). Headings use Poppins
(`font-display`), body text uses Inter (`font-sans`).

## Conventions

- **Server Components by default.** `"use client"` only where a component holds state or animates.
- **Content in `src/data/`.** Components never hard-code lists or copy.
- **Reuse the primitives** in `components/ui` and the motion helpers in `components/motion` before adding new ones.
- **Class names** are combined with `cn()` from `src/lib/cn.ts`, which also resolves conflicting Tailwind classes.
- **Imports** use the `@/` alias for `src/`.
- **No `any`** and no new dependencies without a good reason.
- **Reduced motion** is handled globally by `MotionConfig reducedMotion="user"`; new animations get it for free.

## Before opening a pull request

There is no automated test suite yet. Run these three checks; all must pass:

```bash
npm run lint
npm run typecheck
npm run build
```

Then check your change in the browser at phone, tablet and desktop widths.

**Git workflow**

- Never commit directly to `main`. Create a branch such as `feature/<name>`, `fix/<name>` or `docs/<name>`.
- Use [Conventional Commits](https://www.conventionalcommits.org) for messages, for example
  `feat: add course search` or `fix: prevent chip overflow on small screens`.
- Open a pull request into `main` with a summary, the files changed and screenshots for visual changes.

## Deployment

The app needs a Node.js server because `/courses` and `/creators/[slug]` are rendered per request (they read
the URL options). The other pages are prerendered.

- **Vercel**: import the repository; the default Next.js settings work as is.
- **Any Node.js host**: run `npm ci`, then `npm run build`, then `npm run start` (port 3000 by default).

## Troubleshooting

- **The dev server shows a page without styles, or JavaScript files return 404.** `npm run build` and
  `npm run dev` share the `.next` folder. Stop the dev server before building, or delete `.next` and start
  `npm run dev` again.
- **The build stops with `FATAL ERROR: Zone Allocation failed - process out of memory`.** The machine is short
  on memory (not the Node heap limit). Close other apps and stop any running dev server, then build again.
- **An image does not load.** Its host is probably missing from `images.remotePatterns` in `next.config.ts`.

## Known limitations

- **No backend.** Login, sign-up, newsletter, follow, enrol and social sign-in are front-end only.
- **Demo data.** All six courses share the same level, price, rating and learner count, as on the Figma cards,
  so Level, Most popular and Highest rated cannot tell them apart yet. There are no publish dates, so there
  is no "Newest" sort.
- **Repeated catalogue.** The search page repeats the six courses to fill five pages, as in the Figma
  frame, so one category can show the same course several times.
- **Placeholder images.** The Figma file is view-only. Photos are Unsplash placeholders, the hero student
  is an AI-upscaled cut-out of a supplied 740×416 photo, and the 3D shapes are SVG recreations. Replace
  them in `src/data/media.ts` and `public/images/`.
- **Copy kept as designed.** A few typos in the design (for example "Hundreds Courses") are kept on purpose
  and listed in the PRD for the designer to confirm.

## Screenshots

| Course search | Course detail |
| --- | --- |
| ![Course search page](https://raw.githubusercontent.com/zobayer-hosen/bytespace/feature/landing-page/docs/screenshots/courses.jpg) | ![Course detail page](https://raw.githubusercontent.com/zobayer-hosen/bytespace/feature/landing-page/docs/screenshots/course-detail.jpg) |

| Creator profile | Sign in | 404 |
| --- | --- | --- |
| ![Creator profile page](https://raw.githubusercontent.com/zobayer-hosen/bytespace/feature/landing-page/docs/screenshots/creator.jpg) | ![Sign-in page](https://raw.githubusercontent.com/zobayer-hosen/bytespace/feature/landing-page/docs/screenshots/login.jpg) | ![404 page](https://raw.githubusercontent.com/zobayer-hosen/bytespace/feature/landing-page/docs/screenshots/not-found.jpg) |

| Mobile: landing page | Mobile: course detail |
| --- | --- |
| ![Landing page on a phone](https://raw.githubusercontent.com/zobayer-hosen/bytespace/feature/landing-page/docs/screenshots/mobile-home.jpg) | ![Course detail on a phone](https://raw.githubusercontent.com/zobayer-hosen/bytespace/feature/landing-page/docs/screenshots/mobile-course-detail.jpg) |

## License

No license has been added yet.
