import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getIndexFromPosition } from '../GetIndexFromPosition/GetIndexFromPosition.ts'
import { handleClickIndex } from '../HandleClickIndex/HandleClickIndex.ts'

export const handleClick = async (state: ActivityBarState, button: number, eventX: number, eventY: number): Promise<ActivityBarState> => {
  const { activityBarItems, itemHeight, y } = state
  const index = getIndexFromPosition(y, eventX, eventY, itemHeight, activityBarItems.length)
  return handleClickIndex(state, button, index, eventX, eventY)
}
