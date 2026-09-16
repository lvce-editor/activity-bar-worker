import { AriaRoles } from '@lvce-editor/constants'
import { type VirtualDomNode, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getActivityBarItemHasPopup } from '../GetActivityBarItemHasPopup/GetActivityBarItemHasPopup.ts'
import { getActivityBarItemInProgressDom } from '../GetActivityBarItemInProgressDom/GetActivityBarItemInProgressDom.ts'
import { getActivityBarItemWithBadgeDom } from '../GetActivityBarItemWithBadgeDom/GetActivityBarItemWithBadgeDom.ts'
import { getAriaSelected } from '../GetAriaSelected/GetAriaSelected.ts'
import { getClassName } from '../GetClassName/GetClassName.ts'
import { getIconClass } from '../GetIconClass/GetIconClass.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

type DropIndicator = {
  readonly id: string
  readonly position: 'after' | 'before'
}

const getDropIndicatorStyle = (dropIndicator: DropIndicator | undefined, id: string): string | undefined => {
  if (!dropIndicator || dropIndicator.id !== id) {
    return undefined
  }
  return dropIndicator.position === 'before' ? 'box-shadow:inset 0 2px 0 white;' : 'box-shadow:inset 0 -2px 0 white;'
}

export const getActivityBarItemVirtualDom = (item: ActivityBarItem, draggable = false, dropIndicator?: DropIndicator): readonly VirtualDomNode[] => {
  const { badgeText, flags, icon, id, title } = item
  const ariaHasPopup = getActivityBarItemHasPopup(item) || undefined
  const isTab = flags & ActivityBarItemFlags.Tab
  const isSelected = flags & ActivityBarItemFlags.Selected
  const isFocused = flags & ActivityBarItemFlags.Focused
  const isProgress = flags & ActivityBarItemFlags.Progress
  const role = isTab ? AriaRoles.Tab : AriaRoles.Button
  const ariaSelected = getAriaSelected(isTab, isSelected)
  const marginTop = flags & ActivityBarItemFlags.MarginTop
  const className = getClassName(isFocused, marginTop, isSelected)
  let dom: readonly VirtualDomNode[]
  if (isSelected && !badgeText) {
    dom = [
      {
        ariaHasPopup,
        ariaSelected,
        childCount: 1,
        className,
        name: id,
        role,
        title,
        type: VirtualDomElements.Div,
      },
      {
        ...GetIconVirtualDom.getIconVirtualDom(icon, VirtualDomElements.Div, item.customIconClass),
        name: id,
      },
    ]
  } else if (isProgress) {
    dom = getActivityBarItemInProgressDom(item)
  } else if (badgeText) {
    dom = getActivityBarItemWithBadgeDom(item)
  } else {
    dom = [
      {
        ariaHasPopup,
        ariaSelected,
        childCount: 0,
        className: mergeClassNames(className, getIconClass(item, 'Icon')),
        name: id,
        role,
        title,
        type: VirtualDomElements.Div,
      },
    ]
  }
  const [root, ...children] = dom
  return [
    {
      ...root,
      ...(draggable && { draggable: true }),
      ...(draggable && {
        onDragEnd: DomEventListenerFunctions.HandleDragEnd,
        onDragStart: DomEventListenerFunctions.HandleDragStart,
      }),
      ...(getDropIndicatorStyle(dropIndicator, id) && { style: getDropIndicatorStyle(dropIndicator, id) }),
    },
    ...children,
  ]
}
