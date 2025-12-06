import { type VirtualDomNode, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getBadgeVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.ActivityBarItemBadge,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.BadgeContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.Icon, ClassNames.ActivityBarBadgeIcon, ClassNames.MaskIconProgress),
      type: VirtualDomElements.Div,
    },
  ]
}
