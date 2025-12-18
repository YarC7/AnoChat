# Memory Context Bank

This document describes the design, schema, usage and operational practices for the persistent user memory feature (`user_memory`) implemented in this project.

---

## Purpose

The memory bank stores short-lived, user-scoped context used to personalize AI features (icebreakers, suggestions, preferences), such as recent generated icebreakers, custom preferences or opt-outs. It is intentionally lightweight and meant to hold small JSON serializable items.

Use cases:

- Persist the last 3–10 AI icebreakers suggested to a user to avoid repetition.
- Store user preferences (preferred icebreaker tone, language, last active region).
- Store small conversation metadata used by generation algorithms.

---

## Schema (db/schema.ts)

Table: `user_memory`

- id: TEXT PRIMARY KEY
- user_id: TEXT NOT NULL REFERENCES user(id)
- namespace: TEXT NOT NULL DEFAULT 'default' — logical grouping (e.g., 'icebreakers', 'prefs')
- key: TEXT NOT NULL — key within namespace (e.g., 'recent', 'tone')
- value: TEXT — JSON serialized string up to ~10KB
- createdAt TIMESTAMP NOT NULL DEFAULT NOW()
- updatedAt TIMESTAMP NOT NULL DEFAULT NOW()

Index: `idx_user_memory_user_id` on `user_id` (created in migration)

---

## API

The project provides a small secure CRUD API for user memory. All endpoints verify the caller by resolving the session cookie on the server (do not accept client-supplied user IDs).

- GET /api/user/[userId]/memory?namespace=default

  - Returns all memory rows for `userId` and `namespace`.

- POST /api/user/[userId]/memory

  - Body: { key: string, value: any, namespace?: string }
  - Creates or updates a memory key. Validates key length (1–256 chars), JSON serializability, and size limit for the serialized value (~10KB).

- DELETE /api/user/[userId]/memory?key=...&namespace=...
  - Deletes a named memory key.

Examples (server-side):

```ts
// Set recent icebreakers
await fetch(`/api/user/${userId}/memory`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    namespace: "icebreakers",
    key: "recent",
    value: ["suggestion1", "suggestion2"],
  }),
});

// Read
const res = await fetch(`/api/user/${userId}/memory?namespace=icebreakers`);
const { data } = await res.json();
```

Security note: the endpoints call `getUserIdFromRequest(request)` to ensure the caller is the same user.

---

## Helper: `lib/memory.ts`

Available functions:

- getMemory(userId, namespace)
- getMemoryKey(userId, key, namespace)
- setMemoryKey(userId, key, value, namespace)
- deleteMemoryKey(userId, key, namespace)

`setMemoryKey` performs validations and will throw on invalid input.

---

## Retention & Privacy

- The memory table is intended for short, useful context. Decide an appropriate retention policy for your project (for example, delete entries older than 90 days). We do not automatically expire rows — add a scheduled job or DB policy if required.

- Treat memory data as PII if it includes sensitive fields. Avoid storing raw sensitive data (e.g., payment details). If you must, encrypt the value before storing.

---

## Integration with Premium & Webhooks

- When Stripe webhook marks a user premium (`checkout.session.completed`), the webhook publishes to Redis on `user-updates` with `{ userId, isPremium: true }`. Subscriber services (WS server, API caches) can listen and react (e.g., invalidate cache, unlock features).

- Optionally, on premium activation you may refresh or augment the user's memory (e.g., record `namespace: 'meta', key: 'upgradedAt', value: timestamp`). The webhook currently does not write memory directly; if you want that behavior, we can extend the webhook.

---

## Operational Context (Docker)

The project is fully containerized using Docker Compose.

- **Database Readiness**: The `db` service (Postgres 16) includes a healthcheck using `pg_isready`. The `app` service depends on this healthcheck (`service_healthy`) to ensure migrations run only when the database is ready to accept connections.
- **Redis Readiness**: Similarly, the `redis` service includes a healthcheck (`redis-cli ping`), and both `app` and `ws` services wait for it.
- **Migrations**: Migrations are handled via `npx drizzle-kit push` inside the container's entrypoint. This ensures the schema is always up-to-date with the code version running in the container.
- **Service Ports**:
  - App: 3000
  - WebSocket: 8080
  - Postgres: 2345 (Internal 5432)
  - Redis: 6379
  - Adminer: 1707 (Internal 8080)

---

## Operational notes

- Migration: SQL migration file `drizzle/0001_add_user_memory.sql` adds the table and index. Run `npx drizzle-kit push` or your migration workflow.

- Testing: use Stripe CLI to test webhook flows; use Postman or curl (with a browser session cookie) to test memory API endpoints. The README contains a quick Stripe test example.

- Backups & cleanups: include `user_memory` in DB backups. Consider adding an admin tool to purge old memory rows for users that request data deletion.

---

If you'd like, I can add:

- a small admin endpoint to list & delete memory for a user,
- an automated cleaner job (cron) that removes `updatedAt` older than X days,
- integration tests for the memory API.

Say which one you want next and I’ll add it.
