# AnoChat Project 🚀

A modern, full-stack web application built with Next.js 16 (v16.0.8), featuring real-time communication, AI-driven personalization, and secure payments.

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (v16.0.8)](https://nextjs.org/) (App Router)
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

### Quick commands & Ports

- **App (dev)**: `npm run dev` — http://localhost:3000
- **WebSocket server**: `npm run start:ws` — `ws://localhost:8080`
- **Full stack (Docker)**: `docker compose up --build`

**Common ports**

- `3000` — App
- `8080` — WebSocket server
- `2345` → `5432` — Postgres (host → container)
- `6379` — Redis
- `1707` — Adminer

## 💳 Payments & Webhooks

The project uses Stripe Checkout. Webhooks are handled at `/api/webhooks/stripe`.

**Testing Webhooks locally:**

1. Install [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Use the provided webhook secret in your `.env`.

## 🧠 AI & Memory

User personalization is handled via the `user_memory` table. This allows the AI to remember user preferences and past interactions across sessions. Detailed design can be found in [bank/memory-context.md](bank/memory-context.md).

## 🔧 Config & SEO

- Site metadata and the web app manifest live in `app/manifest.ts` and `app/layout.tsx`. Update page-level metadata or the layout's `metadata` export to set titles, descriptions, and Open Graph tags.
- The repo provides `app/robots/route.ts` and `app/sitemap/route.ts` for search indexing—update these as needed and set `NEXT_PUBLIC_SITE_URL` in your environment.
- For best results: use canonical URLs, structured data (JSON-LD), server-side meta tags for core pages, and ensure compression and cache headers are configured for static assets.

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

---

## 🚀 CI/CD: Deploy to AWS EC2 (SSH)

This repo includes a GitHub Actions workflow that builds the Docker image, pushes it to GHCR, then SSHes into an EC2 instance and deploys via Docker Compose.

Workflow: [.github/workflows/deploy-ec2.yml](.github/workflows/deploy-ec2.yml)

### 1) GitHub Secrets required

Configure these repository secrets:

- `EC2_HOST` — EC2 public IP or DNS (e.g., `1.2.3.4`)
- `EC2_USER` — SSH user (e.g., `ubuntu`)
- `EC2_SSH_KEY` — private key (PEM contents) for SSH access
- `EC2_PORT` — SSH port (default: `22`)
- `EC2_APP_DIR` — application directory on the instance (e.g., `/opt/playground`)
- `GHCR_TOKEN` — GitHub token with `write:packages` and `read:packages` (used for pushing/pulling images)

### 2) EC2 one-time setup

On the EC2 instance:

- Install Docker + Docker Compose plugin
- Create the app directory and a runtime `.env` file:

Example:

```bash
sudo mkdir -p /opt/playground
sudo nano /opt/playground/.env
```

The `.env` **must** include:

- `APP_IMAGE=ghcr.io/<lowercase-owner>/playground:latest`

And any runtime variables your app needs (Stripe keys, auth secrets, etc.).

### 3) Deploy

- Push to `main` (or run the workflow manually via `workflow_dispatch`).
- The workflow uploads [docker-compose.prod.yml](docker-compose.prod.yml) to the server and runs:
  - `docker compose pull`
  - `docker compose up -d`

### AWS Notes: Load Balancer, Security Groups & Scaling

- For production, front EC2 instance(s) with an Application Load Balancer (ALB) to handle TLS termination (use AWS Certificate Manager) and route traffic to your app.
- ALB security group: allow inbound `80/443` from `0.0.0.0/0`.
- EC2 security group: allow inbound from the ALB security group on your app port (e.g., `3000`) and SSH (`22`) only from trusted admin IP(s).
- Use ALB health checks (e.g., `/` or a `/health` endpoint) to verify instance readiness and enable replacement/autoscaling.
- Consider hosting images in GHCR or ECR and restrict access using IAM roles and GitHub Secrets; rotate secrets regularly and grant least privilege.
