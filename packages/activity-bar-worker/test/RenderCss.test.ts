import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss returns empty array', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()

  const result: readonly any[] = renderCss(oldState, newState)

  expect(result).toBeDefined()
})

test('renderCss returns empty array for different states', () => {
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    focus: 1,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focus: 2,
  }

  const result: readonly any[] = renderCss(oldState, newState)

  expect(result).toBeDefined()
})

test('renderCss returns empty array with custom properties', () => {
  const items: readonly ActivityBarItem[] = [
    {
      flags: 0,
      icon: 'icon',
      id: 'test',
      keyShortcuts: '',
      title: 'Test',
    },
  ]

  const oldState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    width: 100,
  }
  const newState: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    width: 200,
  }

  const result: readonly any[] = renderCss(oldState, newState)

  expect(result).toBeDefined()
})
