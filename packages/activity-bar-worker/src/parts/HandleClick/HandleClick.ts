import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { getIndexFromPosition } from '../GetIndexFromPosition/GetIndexFromPosition.ts'
import { handleClickIndex } from '../HandleClickIndex/HandleClickIndex.ts'

const getIndexFromTarget = (state: ActivityBarState, targetName: string): number => {
  if (!targetName) {
    return -1
  }
  const { filteredItems } = state
  return filteredItems.findIndex((item) => item.id === targetName)
}

export const handleClick = async (
  state: ActivityBarState,
  button: number,
  eventX: number,
  eventY: number,
  targetName = '',
): Promise<ActivityBarState> => {
  const { filteredItems, height, itemHeight, y } = state
  const targetIndex = getIndexFromTarget(state, targetName)
  const index = targetIndex === -1 ? getIndexFromPosition(y, eventX, eventY, itemHeight, filteredItems, height) : targetIndex
  return handleClickIndex(state, button, index, eventX, eventY)
}
