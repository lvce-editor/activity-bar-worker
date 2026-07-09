export const getUserName = (userInfo: unknown): string => {
  if (!userInfo || typeof userInfo !== 'object') {
    return ''
  }
  if (!('userName' in userInfo) || typeof userInfo.userName !== 'string') {
    return ''
  }
  return userInfo.userName
}
