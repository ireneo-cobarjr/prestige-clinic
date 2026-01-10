import { bookings } from '../../db/schema'
import { inArray } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // 1️⃣ Require logged-in user
  const user = event.context.user
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  // 2️⃣ Parse request body
  const body = await readBody(event)

  if (!Array.isArray(body?.ids) || body.ids.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ids must be a non-empty array',
    })
  }

  // 3️⃣ Delete bookings
  const deleted = await db
    .delete(bookings)
    .where(inArray(bookings.id, body.ids))
    .returning({ id: bookings.id })

  // 4️⃣ Return result
  return {
    deletedCount: deleted.length,
    deletedIds: deleted.map(row => row.id),
  }
})
