import { bookings } from '../../db/schema'
import { eq, and, gte, lte } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // 1️⃣ Require logged-in user
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // 2️⃣ Parse query params
  const query = getQuery(event)

  const page = parseInt(query.page as string) || 1
  const perPage = parseInt(query.perPage as string) || 50

  const date = query.date as string | undefined
  const startDate = query.startDate as string | undefined
  const endDate = query.endDate as string | undefined

  const offset = (page - 1) * perPage

  // 3️⃣ Build WHERE condition
  let whereCondition

  if (date) {
    // Exact single date
    whereCondition = eq(bookings.date, date)
  }
  else if (startDate && endDate) {
    // Inclusive date range
    whereCondition = and(
      gte(bookings.date, startDate),
      lte(bookings.date, endDate),
    )
  }

  // 4️⃣ Count total matching rows
  const totalRows = await db.$count(bookings, whereCondition)

  // 5️⃣ Fetch paginated rows
  const rows = await db
    .select()
    .from(bookings)
    .where(whereCondition)
    .orderBy(bookings.date, bookings.time)
    .limit(perPage)
    .offset(offset)

  // 6️⃣ Return response
  return {
    page,
    perPage,
    totalRows,
    totalPages: Math.ceil(totalRows / perPage),
    data: rows,
  }
})
