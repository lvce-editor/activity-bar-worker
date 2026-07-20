import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'

const createResetState = (state: ActivityBarState): ActivityBarState => {
  const { accountEnabled, height, itemHeight, platform, uid, userLoginProvider, userLoginState, userName, width, x, y } = state
  return {
    ...createDefaultState(),
    accountEnabled,
    focusedIndex: -1,
    height,
    itemHeight,
    platform,
    uid,
    userLoginProvider,
    userLoginState,
    userName,
    width,
    x,
    y,
  }
}

export const reset = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const resetState = createResetState(state)
  return loadContent(resetState)
}
