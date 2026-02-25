import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

export const renderIncremental = (oldState: ActivityBarState, newState: ActivityBarState): any => {
  const oldDom = renderItems(oldState, oldState)[2]
  const newDom = renderItems(newState, newState)[2]
  const patches = diffTree(oldDom, newDom)
  if (patches.length === 0) {
    return []
  }
  return [ViewletCommand.SetPatches, newState.uid, patches]
}
