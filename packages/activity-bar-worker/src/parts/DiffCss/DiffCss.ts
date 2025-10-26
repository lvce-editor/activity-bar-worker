import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const isEqual = (oldState: ActivityBarState, newState: ActivityBarState): boolean => {
  // TODO compute css more optimized
  // maybe only when items change, and even then not
  // always, but only when it affects the css
  return false
}
