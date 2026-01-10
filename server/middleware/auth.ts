import { users } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // Only protect admin APIs
  if (!event.path.startsWith('/api/admin')) return

  const raw = getCookie(event, 'auth_user')
  if (!raw) {
    throw createError({ statusCode: 401 })
  }

  let authUser: { id: string, username: string }

  try {
    authUser = JSON.parse(raw)
  }
  catch {
    throw createError({ statusCode: 401 })
  }

  if (!authUser.id || !authUser.username) {
    throw createError({ statusCode: 401 })
  }

  // 🔒 Verify against DB
  const user = await db
    .select({
      id: users.id,
      username: users.username,
    })
    .from(users)
    .where(
      and(
        eq(users.id, authUser.id),
        eq(users.username, authUser.username),
      ),
    )
    .limit(1)
    .then(res => res[0])

  if (!user) {
    throw createError({ statusCode: 401 })
  }

  // Attach verified user
  event.context.user = user
})
