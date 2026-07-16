const providerKeys = ['userLoginProvider', 'loginProvider', 'authProvider', 'provider'] as const

export const getUserLoginProvider = (userInfo: unknown): string => {
  if (!userInfo || typeof userInfo !== 'object') {
    return 'Lvce Editor'
  }
  const record = userInfo as Record<string, unknown>
  for (const key of providerKeys) {
    if (typeof record[key] === 'string' && record[key]) {
      return record[key]
    }
  }
  return 'Lvce Editor'
}
