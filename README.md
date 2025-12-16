This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Payments & Webhooks ✅

This project uses Stripe Checkout for payments. To automatically grant users Premium access after a successful Checkout, we rely on a secure server-side webhook that listens for `checkout.session.completed` and sets `user.isPremium = true` in the database.

Environment variables required:

- `STRIPE_SECRET_KEY` — your Stripe API secret key
- `STRIPE_WEBHOOK_SECRET` — the Stripe webhook signing secret (used to verify incoming webhook payloads)
- `REDIS_URL` — (optional) Redis URL if you want the webhook to publish user-update messages for realtime clients

How it works:

1. When a logged-in user starts checkout, we attach `metadata.userId` to the Checkout Session (see `app/api/checkout/route.ts`).
2. Stripe sends a `checkout.session.completed` event to our webhook endpoint at `POST /api/webhooks/stripe`.
3. The webhook verifies the Stripe signature using `STRIPE_WEBHOOK_SECRET`, reads `metadata.userId`, and updates the DB (sets `isPremium` to `true`).
4. Optionally the webhook publishes a message to Redis on channel `user-updates` to inform connected services (like the WS server) that the user plan changed.

Testing locally with Stripe CLI:

1. Install and login to the Stripe CLI: `npm i -g stripe && stripe login`.
2. Start a listener forwarding events to your local app and print the webhook secret (if you haven't set it in env already):

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe --print-secret
```

3. Trigger a `checkout.session.completed` event (replace `USER_ID` with a real user id from your DB):

```bash
stripe trigger checkout.session.completed --add "data.object.metadata.userId=USER_ID"
```

4. Confirm in your DB that the `user.isPremium` flag is set to `true` and watch the server logs for webhook handling.

Notes:

- Do not rely on client redirects alone to grant premium access — the webhook is the single source of truth.
- Set `STRIPE_WEBHOOK_SECRET` in your deployment environment (Vercel/Heroku/etc.) and make sure your site is reachable by Stripe.

---

## Memory / Context (short note) 🧭

Current state:

- **Persistent user memory is implemented** (table: `user_memory`) — full design, examples, and operational guidance are in `bank/memory-context.md`.
- Usage counters and cooldowns for per-user rate limits are stored in Redis (short-lived keys).

Migration & quick start:

- Apply the DB migration: `npx drizzle-kit push` (or run your usual migration workflow). The migration file is `drizzle/0001_add_user_memory.sql`.
- Test memory API locally using an authenticated session (e.g., via browser + fetch / Postman): `GET|POST /api/user/[userId]/memory`.

Notes:

- On premium activation (webhook), the system publishes a `user-updates` message (Redis) so subscribers can invalidate cached memory or refresh UI.
- If you'd like, I can add an admin cleanup endpoint, a scheduled cleanup (cron) to purge old memory, or integration tests for the memory API.
