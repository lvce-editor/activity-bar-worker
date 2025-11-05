import { AriaRoles } from '@lvce-editor/constants'
import { type VirtualDomNode, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getAriaSelected } from '../GetAriaSelected/GetAriaSelected.ts'
import { getClassName } from '../GetClassName/GetClassName.ts'

export const getActivityBarItemInProgressDom = (item: ActivityBarItem): readonly VirtualDomNode[] => {
  const { flags, title, icon } = item
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
      type: VirtualDomElements.Div,
      className,
      ariaLabel: '',
      title,
      role,
      ariaSelected,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.Icon, `MaskIcon${icon}`),
      role: AriaRoles.None,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.Badge, ClassNames.ActivityBarItemBadge),
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.BadgeContent,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.Icon, ClassNames.MaskIconProgress),
      childCount: 0,
    },
  ]
}
