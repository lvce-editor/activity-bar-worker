import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

const hasSameItemIds = (oldState: ActivityBarState, newState: ActivityBarState): boolean => {
  const oldItems = oldState.filteredItems
  const newItems = newState.filteredItems
  return oldItems.length === newItems.length && oldItems.every((item, index) => item.id === newItems[index].id)
}

export const renderIncremental = (oldState: ActivityBarState, newState: ActivityBarState): any => {
  if (!hasSameItemIds(oldState, newState)) {
    return renderItems(oldState, newState)
  }
  const oldDom = renderItems(oldState, oldState)[2]
  const newDom = renderItems(newState, newState)[2]
  const patches = diffTree(oldDom, newDom)
  if (patches.length === 0) {
    return []
  }
  return [ViewletCommand.SetPatches, newState.uid, patches]
}
