import { AriaRoles } from '@lvce-editor/constants'
import { type VirtualDomNode, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getActivityBarItemInProgressDom } from '../GetActivityBarItemInProgressDom/GetActivityBarItemInProgressDom.ts'
import { getAriaSelected } from '../GetAriaSelected/GetAriaSelected.ts'
import { getClassName } from '../GetClassName/GetClassName.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getActivityBarItemVirtualDom = (item: ActivityBarItem): readonly VirtualDomNode[] => {
  const { flags, title, icon } = item
  const isTab = flags & ActivityBarItemFlags.Tab
  const isSelected = flags & ActivityBarItemFlags.Selected
  const isFocused = flags & ActivityBarItemFlags.Focused
  const isProgress = flags & ActivityBarItemFlags.Progress
  const role = isTab ? AriaRoles.Tab : AriaRoles.Button
  const ariaSelected = getAriaSelected(isTab, isSelected)
  const marginTop = flags & ActivityBarItemFlags.MarginTop
  const className = getClassName(isFocused, marginTop, isSelected)
  if (isSelected) {
    return [
      {
        type: VirtualDomElements.Div,
        className,
        ariaLabel: '',
        title,
        role,
        ariaSelected,
        childCount: 1,
      },
      GetIconVirtualDom.getIconVirtualDom(icon),
    ]
  }

  // TODO support progress on selected activity bar item
  if (isProgress) {
    return getActivityBarItemInProgressDom(item)
  }

  return [
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(className, `Icon${icon}`),
      ariaLabel: '',
      title,
      role,
      ariaSelected,
      childCount: 0,
    },
  ]
}
