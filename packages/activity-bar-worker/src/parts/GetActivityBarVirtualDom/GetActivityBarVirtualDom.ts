import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/constants'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as AriaOrientationType from '../AriaOrientationType/AriaOrientationType.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetActivityBarItemsVirtualDom from '../GetActivityBarItemsVirtualDom/GetActivityBarItemsVirtualDom.ts'

const className = mergeClassNames(ClassNames.Viewlet, ClassNames.ActivityBar)

export const getActivityBarVirtualDom = (visibleItems: readonly any[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      id: DomId.ActivityBar,
      className,
      role: AriaRoles.ToolBar,
      ariaRoleDescription: ActivityBarStrings.activityBar(),
      ariaOrientation: AriaOrientationType.Vertical,
      tabIndex: 0,
      onMouseDown: DomEventListenerFunctions.HandleMouseDown,
      onContextMenu: DomEventListenerFunctions.HandleContextMenu,
      onFocus: DomEventListenerFunctions.HandleFocus,
      onBlur: DomEventListenerFunctions.HandleBlur,
      childCount: visibleItems.length,
    },
    ...GetActivityBarItemsVirtualDom.getVirtualDom(visibleItems),
  ]
}
