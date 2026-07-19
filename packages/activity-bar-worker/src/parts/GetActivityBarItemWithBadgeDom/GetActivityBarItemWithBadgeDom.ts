import { AriaRoles } from '@lvce-editor/constants'
import { type VirtualDomNode, mergeClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getActivityBarItemHasPopup } from '../GetActivityBarItemHasPopup/GetActivityBarItemHasPopup.ts'
import { getAriaSelected } from '../GetAriaSelected/GetAriaSelected.ts'
import { getClassName } from '../GetClassName/GetClassName.ts'
import { getIconClass } from '../GetIconClass/GetIconClass.ts'

export const getActivityBarItemWithBadgeDom = (item: ActivityBarItem): readonly VirtualDomNode[] => {
  const { badgeText, flags, id, title } = item
  if (!badgeText) {
    // TODO should not happen
    return []
  }
  const isTab = flags & ActivityBarItemFlags.Tab
  const isSelected = flags & ActivityBarItemFlags.Selected
  const isFocused = flags & ActivityBarItemFlags.Focused
  const role = isTab ? AriaRoles.Tab : AriaRoles.Button
  const ariaSelected = getAriaSelected(isTab, isSelected)
  const ariaHasPopup = getActivityBarItemHasPopup(item) || undefined
  const marginTop = flags & ActivityBarItemFlags.MarginTop
  const className = mergeClassNames(getClassName(isFocused, marginTop, isSelected), ClassNames.ActivityBarItemNested)
  return [
    {
      ariaHasPopup,
      ariaSelected,
      childCount: 2,
      className,
      name: id,
      role,
      title,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.Icon, getIconClass(item, 'MaskIcon')),
      name: id,
      role: AriaRoles.None,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ActivityBarItemBadge,
      name: id,
      type: VirtualDomElements.Div,
    },
    text(badgeText),
  ]
}
