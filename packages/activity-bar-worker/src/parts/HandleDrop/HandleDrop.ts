import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import { PlatformType } from '@lvce-editor/constants'
import { DragAndDropWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarDragData from '../ActivityBarDragData/ActivityBarDragData.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getFilteredActivityBarItems } from '../GetFilteredActivityBarItems/GetFilteredActivityBarItems.ts'
import { handleDragEnd } from '../HandleDragEnd/HandleDragEnd.ts'
import { reorderActivityBarItems } from '../ReorderActivityBarItems/ReorderActivityBarItems.ts'

export const handleDrop = async (context: AsyncCommandContext<ActivityBarState>, dropId: number): Promise<void> => {
  const state = context.getState()
  const {
    activityBarItems: initialActivityBarItems,
    dragAndDropEnabled,
    draggedItemId,
    dropIndicator,
    filteredItems: initialFilteredItems,
    focusedIndex: initialFocusedIndex,
    height,
    itemHeight,
    platform,
    selectedIndex: initialSelectedIndex,
  } = state
  const clearState = handleDragEnd(state)
  if (!dragAndDropEnabled || !draggedItemId || !dropIndicator) {
    await context.updateState(() => clearState)
    return
  }
  const isElectron = platform === PlatformType.Electron
  const result = await DragAndDropWorker.invoke('DragAndDrop.getDroppedItemsByDropId', dropId, isElectron)
  const values = Array.isArray(result?.strings) ? result.strings : []
  if (values.length !== 1 || ActivityBarDragData.getId(values[0]) !== draggedItemId) {
    await context.updateState(() => clearState)
    return
  }
  const activityBarItems = reorderActivityBarItems(initialActivityBarItems, draggedItemId, dropIndicator.id, dropIndicator.position)
  const filteredItems = getFilteredActivityBarItems(activityBarItems, height, itemHeight)
  const selectedId = initialActivityBarItems.find((item) => item.flags & ActivityBarItemFlags.Selected)?.id
  const focusedId = initialFilteredItems[initialFocusedIndex]?.id
  await context.updateState(() => ({
    ...clearState,
    activityBarItems,
    filteredItems,
    focusedIndex: focusedId ? filteredItems.findIndex((item) => item.id === focusedId) : initialFocusedIndex,
    selectedIndex: selectedId ? filteredItems.findIndex((item) => item.id === selectedId) : initialSelectedIndex,
  }))
}
