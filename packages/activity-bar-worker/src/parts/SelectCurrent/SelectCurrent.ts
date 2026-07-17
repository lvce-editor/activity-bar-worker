import { MouseEventType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { handleClickIndex } from '../HandleClickIndex/HandleClickIndex.ts'

const isBottomItem = (id: string): boolean => {
  return id === 'Account' || id === 'Settings'
}

const getItemPosition = (state: ActivityBarState, index: number): readonly [number, number] => {
  const { filteredItems, height, itemHeight, width, x, y } = state
  const item = filteredItems[index]
  const bottomItems = filteredItems.filter(({ id }) => isBottomItem(id))
  const bottomIndex = bottomItems.findIndex(({ id }) => id === item.id)
  const itemY = bottomIndex === -1 ? y + index * itemHeight : y + height - (bottomItems.length - bottomIndex) * itemHeight
  return [x + width / 2, itemY + itemHeight / 2]
}

export const selectCurrent = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { filteredItems, focusedIndex } = state
  if (focusedIndex < 0 || focusedIndex >= filteredItems.length) {
    return state
  }
  const [x, y] = getItemPosition(state, focusedIndex)
  return handleClickIndex(state, MouseEventType.LeftClick, focusedIndex, x, y)
}
