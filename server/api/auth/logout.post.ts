// server/api/auth/logout.post.ts
export default defineEventHandler((event) => {
  deleteCookie(event, 'auth_user');
  return { success: true };
});
