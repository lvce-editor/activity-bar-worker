import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'

export const getComponentState = (uid: number): ActivityBarState => {
  return ActivityBarStates.get(uid).newState
}
