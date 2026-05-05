import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const toUserLoginState = (userState: unknown): ActivityBarState['userLoginState'] => {
  switch (userState) {
    case 'loggedIn':
      return 'logged in'
    case 'loggingIn':
      return 'logging in'
    case 'loggingOut':
      return 'logging out'
    default:
      return 'logged out'
  }
}