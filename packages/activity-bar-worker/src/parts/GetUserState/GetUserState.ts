export const getUserState = (userInfo: unknown): unknown => {
  if (!userInfo || typeof userInfo !== 'object') {
    return undefined
  }
  if (!('userState' in userInfo)) {
    return undefined
  }
  return userInfo.userState
}
