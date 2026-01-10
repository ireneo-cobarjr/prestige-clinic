export default defineNuxtRouteMiddleware(async () => {
  const { fetchUser, isLoggedIn } = useAuth()

  await fetchUser()

  if (isLoggedIn.value) {
    return navigateTo('/admin')
  }
})
