# Scripture Journey

> *"And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself."*
> — **Luke 24:27 (NIV)**

Scripture Journey is a Christ-centered app that helps users explore how the whole Bible points to Jesus through 233 messianic prophecy lessons, each with NIV scripture text, scholarly attribution, and reflective content. Inspired by Luke 24:27.

**[Live Demo](https://systemslibrarian.github.io/scripture-journey/)**

## What This App Includes

- 233 messianic prophecy lessons, each fully developed
- Each lesson includes Old Testament prophecy, New Testament fulfillment, a unique "Why This Matters" reflection, and a quiz
- Scholarly attribution badges from three academic sources (see below)
- Home page with live search/filter by title, Scripture reference, or theme
- Visual Map grouping lessons by 7 categories: Lineage, Identity, Ministry, Rejection, Passion, Resurrection, Kingdom
- Dashboard with progress tracking, quiz performance stats, and study streak
- Individual lesson pages with Scripture blocks, reflection, category badge, and quiz
- Quiz scoring system with per-lesson results and overall accuracy tracking
- Study streak tracking (current and best consecutive days)
- Local progress tracking (`localStorage`) with completion state and dashboard stats
- Progressive Web App (PWA) — installable on mobile and desktop with offline support
- Accessibility: ARIA roles/labels, skip-to-content link, focus-visible styles
- Reverent, warm, readable design for desktop and mobile

## Scholarly Sources

Lesson scholarship is attributed to three foundational works on messianic prophecy:

- **J. Barton Payne** — *Encyclopedia of Biblical Prophecy* (Harper & Row, 1973). Payne catalogs 191 messianic prophecies and provides the numbering system (#1–191) used in this app for cross-reference. 59 lessons currently carry Payne attestation.

- **Alfred Edersheim** — *The Life and Times of Jesus the Messiah* (1883). Appendix IX catalogues 456 Old Testament passages the ancient Rabbis applied to the Messiah. 186 lessons in Scripture Journey are attested by Edersheim.
- **Josh McDowell** — *The New Evidence That Demands a Verdict* (1999). Chapter 8 presents detailed evidence for messianic prophecy fulfillment. 58 lessons carry McDowell attestation.

Lessons display 📘 Payne, 📚 Edersheim, and 📖 McDowell badges when attested by one or more sources.

## Categories

Lessons are organized into 7 prophetic categories, each with a key verse:

| Category | Description |
|---|---|
| Lineage | Ancestry, genealogy, and bloodline of the Messiah |
| Identity | Names, titles, divinity, and nature of the Messiah |
| Ministry | Teaching, miracles, mission, and public works |
| Rejection | Opposition, betrayal, and denial |
| Passion | Suffering, crucifixion, and atoning sacrifice |
| Resurrection | Rising from the dead and post-resurrection appearances |
| Kingdom | Reign, return, eternal dominion, and new covenant |

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Static Site Generation (SSG) — deployed to GitHub Pages
- PWA with service worker (network-first HTML, cache-first assets)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Build and Run

```bash
npm run build
npm run start
```

Optional checks:

```bash
npm run lint
```

## Main Routes

- Home (Prophecy Search): `/`
- Dashboard: `/dashboard`
- Visual Map: `/map`
- Lesson detail: `/lessons/[slug]`
- Example lessons:
  - `/lessons/seed-of-the-woman`
  - `/lessons/son-of-the-father`

The Map page supports deep links to each category section (e.g., `/map#lineage`, `/map#kingdom`).

Unknown lesson slugs render the custom `notFound()` page.

## Project Structure

```text
app/           # Next.js App Router pages
components/    # Reusable UI components (quiz, search, progress, etc.)
data/          # Lesson data (prophecies.ts is the single source of truth)
lib/           # Types, utilities, progress & streak tracking
public/        # Static assets, PWA manifest, service worker, icons
```

## Deployment

Deployed to GitHub Pages at [systemslibrarian.github.io/scripture-journey](https://systemslibrarian.github.io/scripture-journey/).

## Scripture Attribution

Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used for educational and devotional purposes.

After deploy, verify:

- `/`, `/dashboard`, `/map`
- `/lessons/seed-of-the-woman`
- `/lessons/son-of-the-father`
- PWA install prompt on mobile
- Category deep links (e.g., `/map#lineage`)

## Mission

Scripture Journey exists to help people explore Scripture thoughtfully and reverently, and to see how the biblical story points to Jesus.