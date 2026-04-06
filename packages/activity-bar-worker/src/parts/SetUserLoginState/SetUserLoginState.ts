import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { UserLoginState } from '../UserLoginState/UserLoginState.ts'

export const setUserLoginState = (state: ActivityBarState, userLoginState: UserLoginState): ActivityBarState => {
  return {
    ...state,
    userLoginState,
  }
}
