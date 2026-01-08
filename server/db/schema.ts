// server/db/schema.ts
import { pgTable, uuid, text, timestamp, varchar, unique } from 'drizzle-orm/pg-core';

// 1. Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Bookings Table
export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  service: text('service').notNull(),
  date: text('date').notNull(), // or timestamp() if you prefer a date object
  time: text('time').notNull(),
  firstName: text('first_name').notNull(),
  middleName: text('middle_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  addressLine1: text('address_line_1').notNull(),

  // Nullable columns (omit .notNull())
  addressLine2: text('address_line_2'),
  info: text('info'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
},
(table) => {
  return {
    // This creates a naming constraint 'date_time_unique'
    // ensuring no two rows have the same date AND time
    dateTimeUnique: unique('date_time_unique').on(table.date, table.time),
  };
});
