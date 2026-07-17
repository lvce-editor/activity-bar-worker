import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

const getFocusedIndex = (state: ActivityBarState): number => {
  const { filteredItems, focusedIndex } = state
  if (focusedIndex >= 0 && focusedIndex < filteredItems.length) {
    return focusedIndex
  }
  const selectedIndex = filteredItems.findIndex((item) => item.flags & ActivityBarItemFlags.Selected)
  if (selectedIndex !== -1) {
    return selectedIndex
  }
  return filteredItems.length === 0 ? -1 : 0
}

export const handleFocus = (state: ActivityBarState): ActivityBarState => {
  return {
    ...state,
    focused: true,
    focusedIndex: getFocusedIndex(state),
  }
}
