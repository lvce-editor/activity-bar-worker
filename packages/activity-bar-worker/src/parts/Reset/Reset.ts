import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { Dimensions } from '../Dimensions/Dimensions.ts'
import { createDefaultState } from '../CreateDefaultState/CreateDefaultState.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'

export const reset = async (state: ActivityBarState, dimensions: Dimensions): Promise<ActivityBarState> => {
  const defaultState = createDefaultState()
  return loadContent({
    ...defaultState,
    ...dimensions,
    platform: state.platform,
    uid: state.uid,
  })
}
