# Timberline Technical Systems

Astro site for Timberline Technical Systems, deployed on Cloudflare Pages with a small server-side contact endpoint.

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Cloudflare deployment

Use these settings in Cloudflare:

```text
Build command: npm run build
Deploy command: npx wrangler pages deploy dist --project-name <cloudflare-pages-project-name>
Build output directory: dist
```

The contact form posts to `/api/contact`, which is generated as a Cloudflare Pages Function in `dist/_worker.js`.

## Contact form email

The form uses Resend and expects this Cloudflare environment variable:

```text
RESEND_API_KEY
```

The sending domain `timberlinetechnicalsystems.com` must be verified in Resend before mail can be sent from:

```text
contact@timberlinetechnicalsystems.com
```

If the existing Resend API key has full sending access, or sending access for `timberlinetechnicalsystems.com`, it can be reused. If the old key is restricted to `timberlinecodeforge.com`, create a new key after verifying this domain in Resend.
