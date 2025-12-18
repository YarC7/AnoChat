# Playground Project 🚀

A modern, full-stack web application built with Next.js 15, featuring real-time communication, AI-driven personalization, and secure payments.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Caching & Real-time**: [Redis](https://redis.io/) (Pub/Sub & Caching)
- **Messaging**: [Apache Kafka](https://kafka.apache.org/) (Event-driven architecture)
- **Authentication**: [Better Auth](https://www.better-auth.com/) with Google OAuth
- **Payments**: [Stripe](https://stripe.com/) (Checkout & Webhooks)
- **AI**: [Google Generative AI](https://ai.google.dev/) & [Groq](https://groq.com/)
- **Infrastructure**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## ✨ Key Features

- **🔐 Secure Auth**: Seamless authentication using Google OAuth via Better Auth.
- **💬 Real-time Chat**: High-performance chat system powered by WebSockets and Redis Pub/Sub.
- **🤝 Matching System**: Real-time matching lobby for connecting users based on preferences.
- **🤖 AI Icebreakers**: Contextual icebreaker generation to kickstart conversations.
- **🧠 User Memory**: Persistent AI-driven user context for personalized experiences.
- **💳 Premium Subscription**: Stripe integration for upgrading users to premium plans.
- **📱 PWA Ready**: Progressive Web App support with offline capabilities and push notifications.
- **🐳 Dockerized**: One-command setup for the entire development environment.

## 📁 Project Structure

```text
app/                # Next.js App Router (Pages & API Routes)
components/         # React Components (UI, Auth, Layout, PWA)
db/                 # Database Schema & Drizzle Client
drizzle/            # SQL Migrations
hooks/              # Custom React Hooks (WebSocket, Language)
lib/                # Core Logic (Auth, Chat, Kafka, Stripe, Memory)
public/             # Static Assets & Service Worker
scripts/            # Utility Scripts (WS Server, Docker Entrypoint)
utils/              # Helper Functions
bank/               # Documentation & Context Banks
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### Local Development (with Docker)

The easiest way to get started is using Docker Compose, which spins up Postgres, Redis, Adminer, and the App.

1. **Clone the repository**
2. **Set up environment variables**
   Copy `.env.example` (if available) or create a `.env` file:
   ```bash
   DATABASE_URL=postgresql://postgres:postgres@db:5432/playground
   REDIS_URL=redis://redis:6379
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```
3. **Start the services**
   ```bash
   docker compose up --build
   ```
4. **Access the app**
   - Web App: `http://localhost:3000`
   - Adminer (DB UI): `http://localhost:1707`
   - WebSocket Server: `ws://localhost:8080`

### Manual Setup

If you prefer to run services individually:

```bash
npm install
npm run dev
```

## 💳 Payments & Webhooks

The project uses Stripe Checkout. Webhooks are handled at `/api/webhooks/stripe`.

**Testing Webhooks locally:**

1. Install [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Use the provided webhook secret in your `.env`.

## 🧠 AI & Memory

User personalization is handled via the `user_memory` table. This allows the AI to remember user preferences and past interactions across sessions. Detailed design can be found in [bank/memory-context.md](bank/memory-context.md).

## 📡 Real-time Architecture

- **WebSocket Server**: Located in `scripts/ws-server.js`. It handles client connections and integrates with Redis Pub/Sub for cross-instance broadcasting.
- **Redis**: Acts as the message broker between the Next.js API and the WebSocket server.

## 🐳 Docker Configuration

The `docker-compose.yml` includes:

- **App**: Next.js application with auto-migrations.
- **WS**: Dedicated WebSocket server.
- **DB**: PostgreSQL 16 with persistent volumes.
- **Redis**: Redis 7 for caching and pub/sub.
- **Adminer**: Database management tool.

## 📜 License

This project is private and for playground purposes.
