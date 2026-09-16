import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import { getActivityBarItemVirtualDom } from '../GetActivityBarItemVirtualDom/GetActivityBarItemVirtualDom.ts'
import { isMovableActivityBarItem } from '../IsMovableActivityBarItem/IsMovableActivityBarItem.ts'

interface DropIndicator {
  readonly id: string
  readonly position: 'after' | 'before'
}

export const getVirtualDom = (
  visibleItems: readonly ActivityBarItem[],
  dragAndDropEnabled = false,
  dropIndicator?: DropIndicator,
): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap((item) => getActivityBarItemVirtualDom(item, dragAndDropEnabled && isMovableActivityBarItem(item), dropIndicator))
  return dom
}
