export const useAuth = () => {
  const user = useState<any | null>('auth:user', () => null)
  const pending = useState<boolean>('auth:pending', () => false)

  const fetchUser = async () => {
    if (user.value !== null || pending.value) return user.value

    pending.value = true

    try {
      const headers = import.meta.server
        ? useRequestHeaders(['cookie'])
        : undefined

      const data = await $fetch('/api/auth/me', {
        headers,
        credentials: 'include',
      })

      user.value = data ?? null
    }
    catch {
      user.value = null
    }
    finally {
      pending.value = false
    }

    return user.value
  }

  const isLoggedIn = computed(() => !!user.value)

  return {
    user,
    isLoggedIn,
    fetchUser,
  }
}
