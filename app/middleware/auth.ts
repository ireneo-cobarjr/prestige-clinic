export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchUser, isLoggedIn } = useAuth()

  await fetchUser()

  if (!isLoggedIn.value) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }
})
