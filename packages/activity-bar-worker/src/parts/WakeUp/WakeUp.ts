import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'

export const wakeUp = (sleepState: ActivityBarState): void => {
  ActivityBarStates.set(sleepState.uid, sleepState, sleepState)
}
