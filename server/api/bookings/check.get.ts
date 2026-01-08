// server/api/bookings/check.get.ts
import { eq } from 'drizzle-orm';
import { bookings } from '../../db/schema';

export default defineEventHandler(async (event) => {
  // 1. Get the date from the query parameters (?date=YYYY-MM-DD)
  const query = getQuery(event)
  const selectedDate = query.date as string

  if (!selectedDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Date parameter is required',
    })
  }

  try {
    // 2. Query the database for all bookings on that date
    // We select only the 'time' column to keep the response lightweight
    const bookedSlots = await db
      .select({
        time: bookings.time,
      })
      .from(bookings)
      .where(eq(bookings.date, selectedDate))

    // 3. Return an array of just the times (e.g., ["09:00", "14:30"])
    return bookedSlots.map(slot => slot.time)
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Error checking availability',
    })
  }
})
