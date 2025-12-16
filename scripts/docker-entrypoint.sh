#!/bin/sh
set -e

echo "Running DB migrations (drizzle)..."
# Push migrations (requires env DATABASE_URL to be set)
npx drizzle-kit push

echo "Starting Next.js app"
exec npm run start -- -p 3000
