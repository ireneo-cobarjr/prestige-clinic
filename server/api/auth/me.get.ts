// server/api/auth/me.get.ts
export default defineEventHandler((event) => {
  const userCookie = getCookie(event, 'auth_user');
  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie);
  }
  catch (e) {
    return null;
  }
});
