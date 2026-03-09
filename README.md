# Scripture Journey

Scripture Journey is a Christ-centered Next.js app that helps users explore how the whole Bible points to Jesus through prophecy and fulfillment.

## What This App Includes

- 100 prophecy-centered lessons (single source of truth: `data/prophecies.ts`)
- Story mode with the first 10 lessons
- Prophecies page with live search by title, OT reference, NT reference, and summary
- Individual lesson pages with Scripture, reflection, and quiz
- Local progress tracking (`localStorage`) with completion state and dashboard stats
- Reverent, warm, readable design for desktop and mobile

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

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

- Home: `/`
- Dashboard: `/dashboard`
- Story Mode: `/story`
- Prophecies: `/prophecies`
- Prophecy Map: `/map`
- Lesson detail: `/lessons/[slug]`
- Example lessons:
  - `/lessons/seed-of-the-woman`
  - `/lessons/eternal-king`

Unknown lesson slugs render the custom `notFound()` page.

## Project Structure

```text
app/
components/
data/
lib/
public/
```

## Render Deployment (Basics)

Use a Render Web Service with a Node environment.

- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Node version: 18+ (20 recommended)

After deploy, verify:

- `/`, `/dashboard`, `/story`, `/prophecies`, `/map`
- `/lessons/seed-of-the-woman`
- `/lessons/eternal-king`

## Mission

Scripture Journey exists to help people explore Scripture thoughtfully and reverently, and to see how the biblical story points to Jesus.