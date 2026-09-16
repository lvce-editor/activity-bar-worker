import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDragAndDropEnabled } from '../src/parts/SetDragAndDropEnabled/SetDragAndDropEnabled.ts'

test('updates the drag and drop preference in state', () => {
  const state = createDefaultState()

  expect(setDragAndDropEnabled(state, true)).toMatchObject({ dragAndDropEnabled: true })
  expect(setDragAndDropEnabled(state, false)).toBe(state)
})
