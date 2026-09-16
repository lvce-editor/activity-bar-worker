import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const isEqual = (oldState: ActivityBarState, newState: ActivityBarState): boolean => {
  return (
    oldState.activityBarItems === newState.activityBarItems &&
    oldState.dragAndDropEnabled === newState.dragAndDropEnabled &&
    oldState.draggedItemId === newState.draggedItemId &&
    oldState.dropIndicator === newState.dropIndicator &&
    oldState.filteredItems === newState.filteredItems &&
    oldState.focused === newState.focused &&
    oldState.focusedIndex === newState.focusedIndex &&
    oldState.sideBarLocation === newState.sideBarLocation &&
    oldState.sideBarVisible === newState.sideBarVisible &&
    oldState.updateProgress === newState.updateProgress &&
    oldState.updateState === newState.updateState
  )
}
