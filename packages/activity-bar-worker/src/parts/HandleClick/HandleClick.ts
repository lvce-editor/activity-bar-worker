import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getIndexFromPosition } from '../GetIndexFromPosition/GetIndexFromPosition.ts'
import { handleClickIndex } from '../HandleClickIndex/HandleClickIndex.ts'

export const handleClick = async (state: ActivityBarState, button: number, eventX: number, eventY: number): Promise<ActivityBarState> => {
  const { filteredItems, height, itemHeight, y } = state
  const index = getIndexFromPosition(y, eventX, eventY, itemHeight, filteredItems.length, height)
  return handleClickIndex(state, button, index, eventX, eventY)
}
