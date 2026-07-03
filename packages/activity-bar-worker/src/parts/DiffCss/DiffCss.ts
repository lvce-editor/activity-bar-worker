import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as CustomIcon from '../CustomIcon/CustomIcon.ts'

export const isEqual = (oldState: ActivityBarState, newState: ActivityBarState): boolean => {
  return (
    oldState.itemHeight === newState.itemHeight &&
    CustomIcon.getCustomIconSignature(oldState.filteredItems) === CustomIcon.getCustomIconSignature(newState.filteredItems)
  )
}
