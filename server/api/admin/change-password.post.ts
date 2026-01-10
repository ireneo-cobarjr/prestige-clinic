import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  // 1️⃣ Require authenticated user
  const authUser = event.context.user
  if (!authUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  // 2️⃣ Read request body
  const body = await readBody(event)
  const { oldPassword, newPassword } = body || {}

  if (!oldPassword || !newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Old password and new password are required',
    })
  }

  // 3️⃣ Fetch current user
  const user = await db
    .select({
      id: users.id,
      password: users.password,
    })
    .from(users)
    .where(eq(users.id, authUser.id))
    .limit(1)
    .then(rows => rows[0])

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  // 4️⃣ Verify old password
  const isValid = await bcrypt.compare(oldPassword, user.password)
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Old password is incorrect',
    })
  }

  // 5️⃣ Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  // 6️⃣ Update password
  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, user.id))

  // 7️⃣ Return success
  return {
    success: true,
    message: 'Password updated successfully',
  }
})
