import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function main() {
  console.log('Preparing to seed specific users...');

  const usernames = [
    process.env.SEED_USER_1,
    process.env.SEED_USER_2,
    process.env.SEED_USER_3,
  ].filter(Boolean) as string[];

  if (usernames.length === 0) {
    throw new Error('No usernames found in .env! Ensure SEED_USER_1, etc. are set.');
  }

  // 1. Hash the password
  const rawPassword = process.env.SEED_PASSWORD || 'DefaultPassword123';
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  // 2. Prepare the data
  const usersToInsert = usernames.map(username => ({
    username,
    password: hashedPassword,
  }));

  try {
    // 3. Insert and handle potential duplicates
    await db.insert(schema.users)
      .values(usersToInsert)
      .onConflictDoNothing(); // Skips if username already exists

    console.log(`Successfully seeded ${usernames.length} users.`);
  }
  catch (error) {
    console.error('Error during seeding:', error);
  }
  finally {
    await client.end();
  }
}

main();
