import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { DropIndicator } from '../DropIndicator/DropIndicator.ts'
import { getActivityBarItemVirtualDom } from '../GetActivityBarItemVirtualDom/GetActivityBarItemVirtualDom.ts'
import { isMovableActivityBarItem } from '../IsMovableActivityBarItem/IsMovableActivityBarItem.ts'

export const getVirtualDom = (
  visibleItems: readonly ActivityBarItem[],
  dragAndDropEnabled = false,
  dropIndicator?: DropIndicator,
): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap((item) => getActivityBarItemVirtualDom(item, dragAndDropEnabled && isMovableActivityBarItem(item), dropIndicator))
  return dom
}
