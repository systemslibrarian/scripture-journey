# Scripture Journey

> *"And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself."*
> — **Luke 24:27 (NIV)**

Scripture Journey is a Christ-centered app that helps users explore how the whole Bible points to Jesus through 211 messianic prophecy lessons, each with NIV scripture text, scholarly attribution, and reflective content. Inspired by Luke 24:27.

**[Live Demo](https://www.scripturejourney.com/)**

## What This App Includes

- 211 messianic prophecy lessons, each fully developed
- Each lesson includes Old Testament prophecy, New Testament fulfillment, and a unique "Why This Matters" reflection
- Prophecy type classification with color-coded badges (see Prophecy Types below)
- Scholarly attribution badges from three academic sources (see below)
- Home page with orienting welcome message, "Continue Where You Left Off" card, and browse-all lesson search
- Prophecies page with full search/filter by title, Scripture reference, theme, prophecy type, and scholar
- Visual Map grouping lessons by 7 categories with per-category progress bars and completion indicators
- Dashboard with progress tracking, stats row (streak, completed, quiz, best streak), and quiz CTA
- Streak indicator in the header navigation
- Individual lesson pages with Scripture blocks, reflection, category badge, prophecy type badge, and prev/next navigation
- Standalone adaptive quiz page with 10-question sessions drawn from completed lessons
- Sort and filter controls: sort by default, category, completed/not-completed; filter by prophecy type and scholar
- "Surprise Me" button to jump to a random unread lesson
- Sources page with scholar lesson counts and direct links to filtered search results
- Study streak tracking (current and best consecutive days)
- Local progress tracking (`localStorage`) with completion state and dashboard stats
- Progressive Web App (PWA) — installable on mobile and desktop with offline support
- Accessibility: ARIA roles/labels, skip-to-content link, focus-visible styles
- Reverent, warm, readable design for desktop and mobile

## Scholarly Sources

Lesson scholarship is attributed to three foundational works on messianic prophecy:

- **J. Barton Payne** — *Encyclopedia of Biblical Prophecy* (Harper & Row, 1973). Payne catalogs 191 messianic prophecies and provides the numbering system (#1–191) used in this app for cross-reference. 62 lessons currently carry Payne attestation.

- **Alfred Edersheim** — *The Life and Times of Jesus the Messiah* (1883). Appendix IX catalogues 456 Old Testament passages the ancient Rabbis applied to the Messiah. 176 lessons in Scripture Journey are attested by Edersheim.
- **Josh McDowell** — *The New Evidence That Demands a Verdict* (1999). Chapter 8 presents detailed evidence for messianic prophecy fulfillment. 60 lessons carry McDowell attestation.

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

## Prophecy Types

Every lesson is classified into one of four prophecy types, displayed as a color-coded badge on lesson cards, lesson detail pages, the map, and search results:

| Type | Color | Description |
|---|---|---|
| Direct Prophecy | Amber | A clear predictive statement in the Old Testament that is fulfilled literally in Jesus. These are explicit "this will happen" declarations — such as the virgin birth (Isaiah 7:14) or the birthplace of Bethlehem (Micah 5:2). |
| Messianic Psalm | Blue | A Psalm cited by New Testament authors and applied directly to Christ. These include royal psalms, lament psalms, and enthronement psalms that the early church understood as speaking of Jesus — such as Psalm 22 (crucifixion details) and Psalm 110 (seated at God's right hand). |
| Typology | Green | A person, event, or institution in the Old Testament that structurally foreshadows Christ. The "type" is not a prediction in the strict sense but a divinely ordered pattern — such as the Passover lamb, the bronze serpent, or Jonah's three days. |
| Prophetic Pattern | Purple | A broader theme, image, or motif that the New Testament or Rabbinic tradition connects to Jesus. These are not single-verse predictions but recurring ideas — such as the Suffering Servant thread, the shepherd motif, or the concept of a new covenant. |

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM with PostgreSQL
- Render web service deployment
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

- Home (Welcome + Continue Card + Browse All Lessons): `/`
- Dashboard: `/dashboard`
- Visual Map: `/map`
- Quiz: `/quiz`
- Prophecies (Search): `/prophecies`
- Sources: `/sources`
- Lesson detail: `/lessons/[slug]`
- Example lessons:
  - `/lessons/seed-of-the-woman`
  - `/lessons/son-of-the-father`

The Map page supports deep links to each category section (e.g., `/map#lineage`, `/map#kingdom`).

The Prophecies page supports `?scholar=payne`, `?scholar=edersheim`, or `?scholar=mcdowell` query params to pre-filter by scholar.

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

Configured for Render using `render.yaml` with a managed PostgreSQL database.

Required environment variables:

- `DATABASE_URL`: Render PostgreSQL connection string
- `NEXTAUTH_URL`: Public app URL (for example, `https://scripture-journey.onrender.com`)
- `NEXTAUTH_SECRET`: Random secret used by NextAuth
- `EMAIL_FROM`: Sender email address only (for example, `user@gmail.com`)

Email provider setup (choose one approach):

- URL-based SMTP: `EMAIL_SERVER` (for example, `smtp://user@gmail.com:app_password@smtp.gmail.com:587`)
- Split SMTP vars (recommended on Render):
  - `EMAIL_SERVER_HOST` (for Gmail: `smtp.gmail.com`)
  - `EMAIL_SERVER_PORT` (for Gmail TLS: `587`)
  - `EMAIL_SERVER_USER` (full Gmail address)
  - `EMAIL_SERVER_PASSWORD` (Google app password)
  - `EMAIL_SERVER_SECURE` (`false` for port 587, `true` for port 465)

Gmail notes:

- Use a Google app password (16 characters) with 2-Step Verification enabled.
- Do not use your normal Gmail account password.
- If you use `EMAIL_SERVER` URL format, URL-encode special characters in the password.
- If sign-in says email was sent but none arrives, check Render logs for `SIGNIN_EMAIL_ERROR` and SMTP `535` errors.

Database bootstrapping:

- Startup runs `prisma migrate deploy`.

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
