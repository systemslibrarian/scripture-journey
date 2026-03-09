# Scripture Journey

> *"And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself."*
> — **Luke 24:27 (NIV)**

Scripture Journey is a Christ-centered Next.js app that helps users explore how the whole Bible points to Jesus through 227 messianic prophecy lessons, each with NIV scripture text, scholarly attribution, and reflective content. Inspired by Luke 24:27, this project exists to trace every thread of Scripture that points to Christ.

## What This App Includes

- 227 messianic prophecy lessons, each fully developed
- Each lesson includes Old Testament prophecy, New Testament fulfillment, a unique "Why This Matters" reflection, and a quiz
- Scholarly attribution badges from two academic sources (see below)
- Home page with live search/filter by title, Scripture reference, or theme
- Visual Map grouping lessons by category (Identity, Ministry, Rejection, Passion, Resurrection)
- Dashboard with progress tracking
- Individual lesson pages with Scripture blocks, reflection, and quiz
- Local progress tracking (`localStorage`) with completion state and dashboard stats
- Reverent, warm, readable design for desktop and mobile

## Scholarly Sources

Lesson scholarship is attributed to two foundational works on messianic prophecy:

- **Alfred Edersheim** — *The Life and Times of Jesus the Messiah* (1883). Appendix IX catalogues 456 Old Testament passages the ancient Rabbis applied to the Messiah. 186 lessons in Scripture Journey are attested by Edersheim.
- **Josh McDowell** — *The New Evidence That Demands a Verdict* (1999). Chapter 8 presents detailed evidence for messianic prophecy fulfillment. 58 lessons carry McDowell attestation.

Lessons display 📚 Edersheim and 📖 McDowell badges when attested by either or both sources.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Static Site Generation (SSG) — deployed to GitHub Pages

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
  - `/lessons/sons-of-the-living-god`

Unknown lesson slugs render the custom `notFound()` page.

## Project Structure

```text
app/           # Next.js App Router pages
components/    # Reusable UI components
data/          # Lesson data (prophecies.ts is the single source of truth)
lib/           # Types, utilities, progress tracking
public/        # Static assets
```

## Deployment

Deployed to GitHub Pages at [systemslibrarian.github.io/scripture-journey](https://systemslibrarian.github.io/scripture-journey/).

## Scripture Attribution

Scripture quotations taken from The Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™ Used for educational and devotional purposes.

After deploy, verify:

- `/`, `/dashboard`, `/story`, `/prophecies`, `/map`
- `/lessons/seed-of-the-woman`
- `/lessons/eternal-king`

## Mission

Scripture Journey exists to help people explore Scripture thoughtfully and reverently, and to see how the biblical story points to Jesus.