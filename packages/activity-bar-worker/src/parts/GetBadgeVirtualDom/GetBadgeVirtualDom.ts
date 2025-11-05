import { type VirtualDomNode, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getBadgeVirtualDom = (): readonly VirtualDomNode[] => {
  return [
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
