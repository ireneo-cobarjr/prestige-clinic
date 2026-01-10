import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { users } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const username = body.name;
  const password = body.password;

  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' });
  }

  const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);

  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }
    // --- SETTING THE COOKIE ---
    setCookie(event, 'auth_user', JSON.stringify({ id: user.id, username: user.username }), {
      httpOnly: true, // Prevents JS access (Crucial for security)
      secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
      sameSite: 'lax', // Protects against CSRF
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      path: '/', // Available for all routes
    });

    return { success: true };
  }
  else {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }
});
