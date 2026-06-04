# Timberline Technical Systems

Astro site for Timberline Technical Systems, a small consultancy site focused on engineering solutions, business solutions, technical stewardship, and practical delivery support.

The site is designed as a concise one-page presence with a working contact form backed by a Cloudflare runtime endpoint and Resend.

## Purpose

Timberline Technical Systems is positioned around helping teams clarify complex engineering and operational problems, shape practical solutions, and connect technical decisions to business outcomes.

The content intentionally avoids a narrow software-only pitch. The current direction emphasizes:

- Engineering strategy and system design
- Business process and operational clarity
- Recovery of stalled or unclear technical efforts
- Delivery readiness, documentation, and sustainable handoff

## Design Direction

The visual system is a brighter sibling to the Timberline Code Forge identity:

- Dark evergreen base palette
- Warm gold and amber accents
- Subtle blueprint-style grid background
- Mountain and evergreen hero imagery
- Compact, practical card layouts

The site should feel technical, polished, grounded, and service-oriented without becoming overly decorative or software-framework-specific.

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   ├── og-placeholder.svg
│   └── timberline-hero-landscape.jpg
├── src/
│   ├── components/
│   │   ├── BaseHead.astro
│   │   ├── SiteFooter.astro
│   │   └── SiteHeader.astro
│   ├── layouts/
│   │   └── SiteLayout.astro
│   ├── pages/
│   │   ├── api/
│   │   │   └── contact.ts
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Key files:

- `src/pages/index.astro`: Main one-page site content and contact form behavior.
- `src/pages/api/contact.ts`: Server-side contact endpoint that sends email with Resend.
- `src/styles/global.css`: Global layout, color system, responsive behavior, and form styling.
- `public/timberline-hero-landscape.jpg`: Hero card mountain/evergreen image asset.
- `astro.config.mjs`: Astro config using the Cloudflare adapter.

## Local Development

Install dependencies:

```sh
npm install
```

Start the local Astro dev server:

```sh
npm run dev
```

Astro usually serves the site at:

```text
http://localhost:4321
```

Build the production output:

```sh
npm run build
```

Preview a production build locally:

```sh
npm run preview
```

## Contact Form

The contact form posts to:

```text
/api/contact
```

That endpoint is implemented in:

```text
src/pages/api/contact.ts
```

It uses Resend and expects this environment variable at runtime:

```text
RESEND_API_KEY
```

Current email behavior:

- Sends from: `Timberline Contact <hello@timberlinecodeforge.com>`
- Sends to: `hello@timberlinetechnicalsystems.com`
- Sets `replyTo` to the email address submitted in the form

The sender uses `timberlinecodeforge.com` because the current Resend free account supports one verified sending domain. The visible contact address and delivery target remain `hello@timberlinetechnicalsystems.com`.

## Cloudflare Deployment

This project is built for Cloudflare Pages with an Astro Cloudflare adapter so that the static homepage and the dynamic contact endpoint can deploy together.

Recommended Cloudflare settings:

```text
Build command: npm run build
Deploy command: npx wrangler pages deploy dist --project-name <cloudflare-pages-project-name>
Build output directory: dist
```

For this project, the Pages project name may be:

```text
timberline-technical-systems
```

Use the exact Cloudflare Pages project name if it differs.

The build produces:

- `dist/index.html` for the prerendered homepage
- `dist/_worker.js/` for Cloudflare Pages Functions
- `dist/_routes.json` to route dynamic requests such as `/api/contact` through the worker

## Cloudflare Environment Variables

Set this in the Cloudflare Pages project:

```text
RESEND_API_KEY=<your Resend API key>
```

Add it for Production. Add it for Preview too if preview deployments should send test email.

Do not commit API keys to this repository.

## Useful Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

Deploy manually through Wrangler if needed:

```sh
npx wrangler pages deploy dist --project-name <cloudflare-pages-project-name>
```

## Notes

- `.wrangler/`, `.astro/`, `dist/`, and `node_modules/` are generated local files and should not be committed.
- `package-lock.json` should be committed so Cloudflare installs reproducible dependency versions.
- If the contact form fails in production, check Cloudflare environment variables first, then Resend domain/API key permissions, then Cloudflare deployment logs.
