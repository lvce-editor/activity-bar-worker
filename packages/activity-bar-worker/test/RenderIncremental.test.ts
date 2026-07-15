import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderIncremental } from '../src/parts/RenderIncremental/RenderIncremental.ts'

test('renderIncremental returns no commands when the rendered items are unchanged', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    initial: false,
  }

  expect(renderIncremental(state, state)).toEqual([])
})

test('renderIncremental returns patches when the rendered items change', () => {
  const item: ActivityBarItem = {
    flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
    icon: 'Files',
    id: 'Explorer',
    keyShortcuts: '',
    title: 'Explorer',
  }
  const oldState: ActivityBarState = {
    ...createDefaultState(),
    initial: false,
    uid: 123,
  }
  const newState: ActivityBarState = {
    ...oldState,
    filteredItems: [item],
  }

  const result = renderIncremental(oldState, newState)

  expect(result[0]).toBe(ViewletCommand.SetPatches)
  expect(result[1]).toBe(123)
  expect(result[2]).not.toEqual([])
})
