import { PlatformType } from '@lvce-editor/constants'
import { DragAndDropWorker } from '@lvce-editor/rpc-registry'
import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ActivityBarDragData from '../ActivityBarDragData/ActivityBarDragData.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { handleDragEnd } from '../HandleDragEnd/HandleDragEnd.ts'
import { reorderActivityBarItems } from '../ReorderActivityBarItems/ReorderActivityBarItems.ts'

export const handleDrop = async (context: AsyncCommandContext<ActivityBarState>, dropId: number): Promise<void> => {
  const state = context.getState()
  const { draggedItemId, dropIndicator } = state
  const clearState = handleDragEnd(state)
  if (!state.dragAndDropEnabled || !draggedItemId || !dropIndicator) {
    await context.updateState(() => clearState)
    return
  }
  const isElectron = state.platform === PlatformType.Electron
  const result = await DragAndDropWorker.invoke('DragAndDrop.getDroppedItemsByDropId', dropId, isElectron)
  const values = Array.isArray(result?.strings) ? result.strings : []
  if (values.length !== 1 || ActivityBarDragData.getId(values[0]) !== draggedItemId) {
    await context.updateState(() => clearState)
    return
  }
  const activityBarItems = reorderActivityBarItems(state.activityBarItems, draggedItemId, dropIndicator.id, dropIndicator.position)
  const filteredItems = getFilteredActivityBarItems(activityBarItems, state.height, state.itemHeight)
  const selectedId = state.activityBarItems.find((item) => item.flags & ActivityBarItemFlags.Selected)?.id
  const focusedId = state.filteredItems[state.focusedIndex]?.id
  await context.updateState(() => ({
    ...clearState,
    activityBarItems,
    filteredItems,
    selectedIndex: selectedId ? filteredItems.findIndex((item) => item.id === selectedId) : state.selectedIndex,
    focusedIndex: focusedId ? filteredItems.findIndex((item) => item.id === focusedId) : state.focusedIndex,
  }))
}
