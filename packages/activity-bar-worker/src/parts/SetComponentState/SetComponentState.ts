import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'

const applyComponentState = (currentState: ActivityBarState, state: ActivityBarState): ActivityBarState => {
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('Activity Bar state must be an object')
  }
  const { uid } = state
  const { uid: currentUid } = currentState
  if (uid !== currentUid) {
    throw new Error(`Activity Bar state uid must remain ${currentUid}`)
  }
  return state
}

export const setComponentState = ActivityBarStates.wrapCommand(applyComponentState)
