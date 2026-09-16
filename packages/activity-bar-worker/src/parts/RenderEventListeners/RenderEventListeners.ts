import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  const DropId = 'event.dropId'
  return [
    {
      name: DomEventListenerFunctions.HandleBlur,
      params: ['handleBlur'],
    },
    {
      name: DomEventListenerFunctions.HandleFocus,
      params: ['handleFocus'],
    },
    {
      name: DomEventListenerFunctions.HandleContextMenu,
      params: ['handleContextMenu', EventExpression.Button, EventExpression.ClientX, EventExpression.ClientY],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleMouseDown,
      params: ['handleClick', EventExpression.Button, EventExpression.ClientX, EventExpression.ClientY, EventExpression.TargetName],
      preventDefault: false,
      stopPropagation: false,
    },
    {
      name: DomEventListenerFunctions.HandleDragOver,
      params: ['handleDragOver', EventExpression.ClientY],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleDragLeave,
      params: ['handleDragLeave'],
    },
    {
      name: DomEventListenerFunctions.HandleDrop,
      params: ['handleDrop', DropId],
      preventDefault: true,
    },
    {
      // @ts-ignore
      dragEffect: 'move',
      name: DomEventListenerFunctions.HandleDragStart,
      params: ['handleDragStart', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.HandleDragEnd,
      params: ['handleDragEnd'],
    },
  ]
}
