import { AriaRoles } from '@lvce-editor/constants'
import { type VirtualDomNode, mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getAriaSelected } from '../GetAriaSelected/GetAriaSelected.ts'
import { getClassName } from '../GetClassName/GetClassName.ts'

export const getActivityBarItemWithBadgeDom = (item: ActivityBarItem): readonly VirtualDomNode[] => {
  const { badgeText, flags, icon, title } = item
  if (!badgeText) {
    // TODO should not happen
    return []
  }
  const isTab = flags & ActivityBarItemFlags.Tab
  const isSelected = flags & ActivityBarItemFlags.Selected
  const isFocused = flags & ActivityBarItemFlags.Focused
  const role = isTab ? AriaRoles.Tab : AriaRoles.Button
  const ariaSelected = getAriaSelected(isTab, isSelected)
  const marginTop = flags & ActivityBarItemFlags.MarginTop
  let className = getClassName(isFocused, marginTop, isSelected)
  className += ' ' + ClassNames.ActivityBarItemNested
  return [
    {
      ariaLabel: '',
      ariaSelected,
      childCount: 2,
      className,
      role,
      title,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.Icon, `MaskIcon${icon}`),
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ActivityBarItemBadge,
      type: VirtualDomElements.Div,
    },
    text(badgeText),
  ]
}
