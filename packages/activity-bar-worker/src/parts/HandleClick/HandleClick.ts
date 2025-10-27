import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getIndexFromPosition } from '../GetIndexFromPosition/GetIndexFromPosition.ts'
import { handleClickIndex } from '../HandleClickIndex/HandleClickIndex.ts'

export const handleClick = async (state: ActivityBarState, button: number, x: number, y: number): Promise<ActivityBarState> => {
  const { activityBarItems, itemHeight } = state
  const index = getIndexFromPosition(x, y, itemHeight, activityBarItems.length)
  return handleClickIndex(state, button, index, x, y)
}
