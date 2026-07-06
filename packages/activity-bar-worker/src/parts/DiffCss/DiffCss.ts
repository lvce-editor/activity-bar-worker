import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getCustomIconSignature } from '../GetCustomIconSignature/GetCustomIconSignature.ts'

export const isEqual = (oldState: ActivityBarState, newState: ActivityBarState): boolean => {
  return (
    oldState.itemHeight === newState.itemHeight &&
    getCustomIconSignature(oldState.filteredItems) === getCustomIconSignature(newState.filteredItems)
  )
}
