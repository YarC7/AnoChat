#!/bin/sh
set -e

# Ensure drizzle config JSON exists (when only TS config is present)
echo "Writing drizzle.config.json from env..."
cat > /app/drizzle.config.json <<EOF
{
  "out": "./drizzle",
  "schema": "./db/schema.ts",
  "dialect": "postgresql",
  "dbCredentials": { "url": "${DATABASE_URL}" }
}
EOF

echo "Running DB migrations (drizzle)..."
# Push migrations (requires env DATABASE_URL to be set); explicit config avoids missing-file errors
npx drizzle-kit push --config ./drizzle.config.json || true

echo "Starting Next.js app"
exec npm run start -- -p 3000
