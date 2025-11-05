import { type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import { getActivityBarItemVirtualDom } from '../GetActivityBarItemVirtualDom/GetActivityBarItemVirtualDom.ts'

export const getVirtualDom = (visibleItems: readonly ActivityBarItem[]): readonly VirtualDomNode[] => {
  const dom = visibleItems.flatMap(getActivityBarItemVirtualDom)
  return dom
}
