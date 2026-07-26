import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'

export const sleep = (uid: number): ActivityBarState => {
  const { newState } = ActivityBarStates.get(uid)
  return newState
}
