echo "-- Reset db --"
npx prisma migrate reset --force

echo "-- Load data--"
npx ts-node src/data/seed/index.ts

echo "-- Seeded--"

