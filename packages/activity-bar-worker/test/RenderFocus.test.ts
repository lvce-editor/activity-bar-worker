import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusId from '../src/parts/FocusId/FocusId.ts'
import { renderFocus } from '../src/parts/RenderFocus/RenderFocus.ts'

test('focuses the activity bar when focus is List', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = {
    ...createDefaultState(),
    focus: FocusId.List,
    uid: 123,
  }

  expect(renderFocus(oldState, newState)).toEqual([ViewletCommand.FocusSelector, 123, '#ActivityBar'])
})

test('does not focus the activity bar when focus is not List', () => {
  const oldState: ActivityBarState = createDefaultState()
  const newState: ActivityBarState = createDefaultState()

  expect(renderFocus(oldState, newState)).toEqual([])
})
