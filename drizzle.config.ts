// drizzle.config.ts
import 'dotenv/config'; // Required to read your .env file
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './server/db/migrations',
  schema: './server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Use your Pooler string (Port 6543)
  },
});
