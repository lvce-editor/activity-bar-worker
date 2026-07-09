import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { UserLoginState } from '../UserLoginState/UserLoginState.ts'
import { getUserLoginProvider } from '../GetUserLoginProvider/GetUserLoginProvider.ts'
import { getUserName } from '../GetUserName/GetUserName.ts'

export const setUserLoginState = (state: ActivityBarState, userLoginState: UserLoginState, userInfo?: unknown): ActivityBarState => {
  return {
    ...state,
    userLoginProvider: getUserLoginProvider(userInfo),
    userLoginState,
    userName: getUserName(userInfo),
  }
}
