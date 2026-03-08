# Scripture Journey

Scripture Journey is a guided Christian learning app that helps beginners discover how the whole Bible points to Jesus through promises, prophecies, patterns, and fulfillment.

## V1 Features
- Story Path with short lessons from Genesis to resurrection themes
- OT-to-NT prophecy cards with Scripture-first summaries
- Guided lesson pages with quick quiz checks
- Progress dashboard with paths, badges, and completion bar
- Calm, reverent interface built for desktop and mobile

## Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Local static data (no database required in V1)

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Routes
- `/` Home
- `/dashboard` Dashboard
- `/story` Story path
- `/prophecies` Prophecy path
- `/map` Prophecy map
- `/lessons/[slug]` Lesson detail page

## Deploy on Render
1. Create a new `Web Service` from this repository.
2. Use environment: `Node`.
3. Build command: `npm install && npm run build`.
4. Start command: `npm start`.
5. Set Node version to `>=18`.
