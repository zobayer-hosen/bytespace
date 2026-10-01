# ByteSpace Web — Product Requirements Document

| | |
|---|---|
| **Product** | ByteSpace — online course marketplace for learners and creators |
| **Scope of this release** | Every frame in the Figma file: landing page, course search, course detail (About / Lessons / Reviews), creator profile, 404, login and signup |
| **Source of truth** | Figma file "ByteSpace New Check website" (Home, Register, Login, Search Page, Course Detail, Course Lessons, Course Reviews, Creator Profile, 404 Not Found frames) |
| **Stack** | Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion 12 |
| **Status** | v1 — ready for review via Pull Request |

---

## 1. Goal

Rebuild the ByteSpace Figma design as a production-quality, responsive Next.js front end that matches the
design section by section, uses reusable components, and adds tasteful motion. The code must live in a
**public GitHub repository**, be developed on a **feature branch** (never directly on `main`), and be
submitted through a **Pull Request**.

### Success criteria

1. Every Figma frame is implemented, with its sections in order, and visually matches the design at
   1440px desktop width (layout, spacing rhythm, typography scale, colors, radii).
2. The layout adapts cleanly to tablet (768px) and mobile (375px) with no horizontal scroll.
3. Repeated UI (course card, chips, buttons, stat cards, avatars, 3D shapes) is built once as a
   component and reused — no copy-pasted markup.
4. Animations are smooth, purposeful and respect `prefers-reduced-motion`.
5. `npm run build`, `npm run lint` and `npm run typecheck` pass with zero errors.
6. Git history shows work on `feature/landing-page`, merged to `main` through a PR.

### Non-goals (v1)

- Real authentication, a backend or a database (forms validate on the client only).
- A video player for the course preview — it has no design yet (see §10).
- CMS integration — content lives in typed data files in `src/data/`.

---

## 2. Users

| User | What they need from these pages |
|---|---|
| **Learner** (visitor) | Understand what ByteSpace offers, search or browse categories, see popular courses, trust the platform (stats, testimonials), sign up. |
| **Creator** | See that they can publish and earn from courses ("Create & Manage", "Join as Creator"), then sign up. |
| **Returning user** | Sign in quickly with email/password or a social provider. |

---

## 3. Design system (extracted from Figma)

### 3.1 Colors

| Token | Hex | Usage |
|---|---|---|
| `brand` | `#0B3BF5` | Hero, CTA banner and auth backgrounds, prices, links, check icons |
| `brand-600` | `#0831D0` | Hover state for blue elements |
| `accent` | `#D4F531` | Primary buttons, active chip, "26+" badges, progress fill, 3D shapes |
| `accent-600` | `#C2E31F` | Hover state for accent buttons |
| `ink` | `#101223` | Headings, body text on light backgrounds |
| `muted` | `#6B6F80` | Paragraphs, meta text |
| `surface` | `#F4F4F6` | Logo strip background, chips, soft panels |
| `mist` | `#F7F8FB` | Base of the soft lime/blue glow sections (growth, create, testimonials) |
| `line` | `#E6E7EC` | Card borders, dividers, input borders |

### 3.2 Typography

| Role | Font | Desktop size / weight |
|---|---|---|
| Display (hero H1, 404 headline) | Poppins | 72px / 600, line-height 1.15 |
| Section heading (H2) | Poppins | 44px / 600 (32px for compact headings such as "Explore Diverse Learning Paths") |
| Page title (search, course, creator) | Poppins | 32–36px / 600 |
| Card title | Poppins | 20px / 600 |
| Body | Inter | 15–16px / 400, muted color |
| Chips / meta | Inter | 12–15px / 400–500 |

Sizes were measured from the Figma exports at 1440px (e.g. the hero H1 line is ≈856px wide).

Fonts load through `next/font/google` (self-hosted, no layout shift).

### 3.3 Shape and elevation

- Radii: pills `9999px`, cards `20px`, image insets `14px`, auth panel `24px`.
- Cards: 1px `line` border, white background, soft shadow on hover.
- Blue sections use a 1px white grid overlay: 120px cells (12 columns at 1440px), 10% opacity.
- Decorative 3D objects (lime squiggle, cylinder, cone, torus, white squiggle) are built as reusable
  SVG components in `src/components/shapes/` so they scale crisply and can be swapped for Figma PNG
  exports later without touching section code.

---

## 4. Page requirements — Landing (`/`)

Each section is its own component in `src/components/sections/home/`, composed in `src/app/page.tsx`.

| # | Section | Component | Content and behavior |
|---|---|---|---|
| 1 | **Navbar** | `layout/Navbar` | Logo; center links Home (active), Courses, Creators; right: Sign In, Join Us, cart icon. Transparent over the blue hero. Mobile: hamburger with animated slide-down menu. |
| 2 | **Hero** | `Hero` | Blue grid background. H1 "Get Access to Hundreds Courses Available", subtitle, search bar ("Course, topic, creator") with lime Search button. Lime half-circle stage with student photo and three floating cards: *UI/UX Design* (200 Courses · 1000+ Students), *Learning Progress* (55% bar), *Happy Students* (4.5 rating, avatar stack, 2K+). 3D shapes float around the edges. |
| 3 | **Logo cloud** | `LogoCloud` | Grey band with five partner logos (placeholder "Logoipsum" marks). |
| 4 | **Discover courses** | `DiscoverCourses` | H2 "Discover Your Passion, Build Your Skills", paragraph, category chips (Featured first and active; the first 8 are shown, "+ More" reveals the rest, then "Show less"). Featured shows the courses marked `featured`; any other chip shows the courses whose `categories` include it. Filtering happens in place (no URL change); a category without courses shows "No courses in this category yet." with "Show featured courses". |
| 5 | **Learning paths** | `LearningPaths` | H2 "Explore Diverse Learning Paths at Bytespace", paragraph, six `CategoryTile`s (Design, Development, IT & Software, Business, Marketing, Photography). |
| 6 | **Professional growth** | `GrowthSection` | Soft lime/blue gradient background. Left: H2, paragraph, stats 12K Students · 70+ Courses · 16 Creators. Right: course card, student photo, Learning Progress card, lime squiggle. |
| 7 | **Create & manage** | `CreateManage` | Left: creator photo, blue *Total Revenue $120.29* and *Year to Date $1,200.38* cards, Happy Students card, squiggle. Right: H2 "Create & Manage Courses Easily.", paragraph, four checklist items. |
| 8 | **Creator CTA** | `CreatorCta` | Full-width blue grid banner with 3D shapes, H2 "Unlock Your Potential as a Creator with ByteSpace", paragraph, lime "Join as Creator" button → `/signup`. |
| 9 | **Testimonials** | `Testimonials` | H2 left, paragraph right, three `TestimonialCard`s (avatar, name, blue role, quote). |
| 10 | **Footer** | `layout/Footer` | Logo, newsletter blurb, email input + button, consent note, three link columns, bottom bar with copyright and legal links. |

### Course card (reused on landing, growth section and auth pages)

Image with three glass pills (lessons, duration, comments) → title (1-line ellipsis) + rating →
"by purepearl studio" → level pill + avatar stack with "26+" → price "$25/lifetime". Hover: lifts 4px
and gains shadow; image zooms slightly.

---

## 5. Page requirements — Catalogue, course and creator pages

Each page's sections live in `src/components/sections/<page>/`.

| Page | Route | Content and behavior |
|---|---|---|
| **Search** | `/courses` | Blue header "Find Your Next Course", search field and a lime "Courses ▾" scope select (search course titles or creator names). Toolbar: **Filter** (panel to set level + category, then Apply or Clear all), **Level** and **Category** dropdowns (with result counts) and a **sort** dropdown (Most relevant, Most popular, Highest rated, Title A–Z). Category chips under it (first row, "+ More" / "Show less") stay in sync with the Category dropdown. 3-column course grid (18 per page) and numbered pagination. Search, filters, sort and page live in the URL (`?q=&in=&category=&level=&sort=&page=`) so results are server-rendered and shareable; changing a filter is a client-side navigation back to page 1. Empty states offer "Clear filters" or "Clear search". |
| **Course detail** | `/courses/[slug]` | Blue header with title, subtitle, creator link, level / rating / students pills and a Share button (native share sheet, or copy link). Video poster, then About · Lessons · Reviews tabs. A sticky enrol card spans the blue and white areas: lesson preview, price, Enroll Now, inclusions and the creator. **About:** description, Sneak Peak gallery, Key Points. **Lessons:** modules, lesson content, progress tracking. **Reviews:** rating summary (average plus a bar per star level) and review cards filtered by star rating. |
| **Creator profile** | `/creators/[slug]` | Blue header with avatar, name, "Creator" badge, tagline, bio, Products / Followers pills and a Follow toggle; then the same toolbar (filters + sort, in the URL) and the creator's courses. |
| **404** | any unknown URL, or an unknown course / creator slug | Giant lime "404" fading into the blue grid, "The page you are looking for doesn't exist", helper text and "Back to Home". |

## 6. Page requirements — Auth

Shared `AuthShell`: full-viewport blue grid background, left showcase column, right white form panel
(on mobile the showcase is hidden and the panel is full-width).

| Page | Route | Left column | Form |
|---|---|---|---|
| **Sign up** | `/signup` | Logo mark, "Sign up and come in", paragraph, card collage (two course cards, Happy Students card, lime cone, ring, white squiggle) | Eyebrow "Create an Account", H1 "Welcome to ByteSpace", Full Name, Email, Password, lime **Continue** button, "Already have an account? Login" |
| **Sign in** | `/login` | Logo mark, "Sign in with ease", paragraph, same collage | Eyebrow "Sign In", H1 "Welcome Back", Email, Password, lime **Sign In** button, "or" divider, Facebook and Google buttons, "New user? Create an account" |

Validation (client side): required fields, email format, password minimum 8 characters; inline error
messages under the field; submit shows a loading state then a success message. No data is sent anywhere.

---

## 7. Motion spec (Framer Motion)

| Pattern | Where | Spec |
|---|---|---|
| **Reveal on scroll** | Every section heading, paragraph, grid | Fade + 24px rise, 0.6s, ease `[0.22, 1, 0.36, 1]`, triggers once when 20% visible |
| **Stagger** | Course grid, category tiles, chips, testimonials, stats | Children 0.08s apart |
| **Hero intro** | H1, subtitle, search, stage | Sequenced on load (0 → 0.45s) |
| **Float** | 3D shapes and floating stat cards | Infinite y / rotate loop, 4–7s, eased, offset per item |
| **Hover** | Course cards, category tiles, buttons | Lift + shadow; buttons scale 1.03 / tap 0.97 |
| **Progress bar** | Learning Progress cards | Width animates 0 → 55% when visible |
| **Count-up** | Stats (12K, 70+, 16) | Counts up when visible |
| **Mobile menu** | Navbar | `AnimatePresence` height/opacity |
| **Auth panel** | Login / Signup | Panel slides in from right, showcase cards drop in with stagger |
| **Tabs** | Course detail | Panels cross-fade with a 12px rise |

All motion is wrapped in `MotionConfig reducedMotion="user"`, so users with reduced-motion settings get
static content.

---

## 8. Technical requirements

### 8.1 Folder structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, MotionProvider
│   ├── globals.css           # Tailwind v4 @theme tokens + utilities
│   ├── not-found.tsx         # 404 page (wrapped in the site shell)
│   ├── robots.ts
│   ├── (site)/               # navbar + footer shell
│   │   ├── layout.tsx
│   │   ├── page.tsx          # landing page = composition of sections
│   │   ├── courses/page.tsx  # search
│   │   ├── courses/[slug]/page.tsx
│   │   └── creators/[slug]/page.tsx
│   └── (auth)/
│       ├── layout.tsx        # shared blue auth shell
│       ├── login/page.tsx
│       └── signup/page.tsx
├── components/
│   ├── layout/               # Navbar, Footer, Logo, SiteShell, NewsletterForm
│   ├── sections/             # home/, courses/, course/, creator/, not-found/ — one file per section
│   ├── courses/              # CourseGrid, CategoryFilter, CourseToolbar, FilterPanel, useCourseFilters
│   ├── auth/                 # AuthShowcase, AuthPanel, AuthForm, SocialSignIn, BrandIcons
│   ├── cards/                # CourseCard, ProgressCard, HappyStudentsCard, TopicCard, RevenueCard, ...
│   ├── ui/                   # Button, Chip, Pill, Tabs, FormField, Pagination, SectionHeading, ...
│   ├── shapes/               # 3D decorative SVG components + Decorations layer
│   └── motion/               # Reveal, Stagger, Float, CountUp, MotionProvider, variants
├── data/                     # typed content: courses, creators, categories, home, course-detail, auth, nav, media
├── lib/                      # cn(), catalogue search, course filters/sort, form validation
└── types/                    # shared TypeScript types
```

### 8.2 Engineering rules

- Server Components by default; `"use client"` only for components that animate or hold state.
- Content is data-driven from `src/data/*` (no hard-coded arrays inside JSX).
- Images use `next/image` with explicit `sizes`; remote hosts allow-listed in `next.config.ts`.
- All image URLs live in `src/data/media.ts` so Figma exports can replace them in one place.
- Accessibility: semantic landmarks (`header`, `main`, `section`, `footer`), labelled inputs, alt text,
  visible focus rings, color contrast ≥ 4.5:1 for body text, decorative shapes `aria-hidden`.
- No `any`; strict TypeScript.

### 8.3 Git workflow

1. `main` holds only the initial scaffold.
2. All feature work happens on `feature/landing-page` in small, descriptive commits
   (scaffold → primitives → sections → auth → polish).
3. Push the branch and open a PR into `main` with a summary, screenshots and a test checklist.
4. Merge after review; do not commit directly to `main`.

---

## 9. Acceptance checklist

- [ ] All 10 landing sections present in Figma order
- [ ] Search, course detail (3 tabs), creator profile and 404 pages match their frames
- [ ] Search query, scope and page survive a reload (URL state); unknown slugs return 404
- [ ] Desktop 1440px visually matches Figma; tablet and mobile layouts have no overflow
- [ ] Navbar links, Sign In → `/login`, Join Us → `/signup`, "Join as Creator" → `/signup`
- [ ] Category chips, Filter, Level, Category and sort controls filter and order the results; + More / Show less work
- [ ] Login and Signup validate inputs and show errors
- [ ] Animations run on load and scroll; disabled with reduced motion
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95 (desktop)
- [ ] `npm run build`, `npm run lint`, `npm run typecheck` pass
- [ ] Public repo, work on feature branch, PR opened

---

## 10. Open questions and follow-ups

**Copy issues found in the design.** The build keeps the design copy; the designer should confirm
these fixes before launch:

- "Hundreds Courses" → "Hundreds of Courses"
- Footer newsletter button reads "Search" → likely "Subscribe"
- Footer copyright year "2023"
- Course title "the Power of Big Data" → capital "The"
- "Sneak Peak" → "Sneak Peek"; "This course include" → "This course includes"
- The Lessons tab lists Modules 1, 2, 4, 5, 6, 7 — Module 3 is missing
- The same course shows Beginner / 4.5 on its card but Intermediate / 4.8 (172 reviews) on its detail page

**Small deviations made on purpose** (each is a one-line revert if the designer disagrees):

- Creator bio: the "[Creator's Name]" placeholder is filled with the creator's name and "live into" reads
  "Dive into".
- The navbar highlights the current section; every Figma frame shows "Home" as active.
- Rating-summary rows fill as many stars as their level (the frame shows five dark stars on every row).
- The course tab is labelled "Lessons" on both frames (the Lessons frame says "Lesson").
- The "Courses ▾" control on the search page chooses what to search: course titles or creator names.

**Assets.** Photos and 3D objects could not be exported from Figma (view-only access). Photos are
Unsplash placeholders and the 3D objects are SVG recreations. The hero student is cut out of a
supplied 740×416 photo (AI-upscaled 4× with Real-ESRGAN, yellow studio background removed); the growth and creator cut-outs in
`public/images/people/` were made from Unsplash photos. Export the originals from Figma into `public/images/`
and update `src/data/media.ts`.

**Course data behind the filters.** Filters and sorting only use real course fields:

- Each course has `categories` (one or more) and `featured`. The Figma cards show neither, so categories were
  assigned from the course titles (e.g. "the Power of Big Data" → Data Science; Build Digital Asset is also
  UI/UX Design, from its UX module) and all six courses are featured, as in the design. Categories with no
  course show an empty state.
- All six demo courses are Beginner, rated 4.5 and have 26 learners (as on the Figma cards), so the Level
  filter, "Most popular" and "Highest rated" work but cannot separate them until real data varies.
- There is no publish date, so a "Newest" sort is not offered.
- The search page's demo catalogue repeats the six courses to fill five pages, so a category shows the same
  course many times (e.g. Data Science → 15 cards).
- The landing page shows the first 8 chips before "+ More"; on desktop that is two rows (8 chips plus "+ More"
  need about 1258px). The search page shows 7, which fit one row there.

**Follow-ups.**

- Learning-path tiles and footer category links still open the unfiltered catalogue: their labels (Design,
  Development, Business, …) are not chip categories.
- Video player for the course preview, a cart, and real authentication with Facebook / Google.
