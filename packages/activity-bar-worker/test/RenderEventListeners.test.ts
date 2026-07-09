import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners returns array of event listeners', () => {
  const listeners = renderEventListeners()
  expect(listeners).toBeDefined()
})

test('renderEventListeners includes target name for mouse down', () => {
  const listeners = renderEventListeners()
  const mouseDownListener = listeners.find((listener) => listener.name === DomEventListenerFunctions.HandleMouseDown)

  expect(mouseDownListener?.params).toEqual([
    'handleClick',
    EventExpression.Button,
    EventExpression.ClientX,
    EventExpression.ClientY,
    EventExpression.TargetName,
  ])
})
