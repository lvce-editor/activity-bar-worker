import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/constants'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as AriaOrientationType from '../AriaOrientationType/AriaOrientationType.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetActivityBarItemsVirtualDom from '../GetActivityBarItemsVirtualDom/GetActivityBarItemsVirtualDom.ts'

const className = mergeClassNames(ClassNames.Viewlet, ClassNames.ActivityBar)

export const getActivityBarVirtualDom = (visibleItems: readonly ActivityBarItem[]): readonly VirtualDomNode[] => {
  return [
    {
      ariaOrientation: AriaOrientationType.Vertical,
      ariaRoleDescription: ActivityBarStrings.activityBar(),
      childCount: visibleItems.length,
      className,
      id: DomId.ActivityBar,
      onBlur: DomEventListenerFunctions.HandleBlur,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onFocus: DomEventListenerFunctions.HandleFocus,
      onMouseDown: DomEventListenerFunctions.HandleMouseDown,
      role: AriaRoles.ToolBar,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...GetActivityBarItemsVirtualDom.getVirtualDom(visibleItems),
  ]
}
