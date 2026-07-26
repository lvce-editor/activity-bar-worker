import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { sleep } from '../src/parts/Sleep/Sleep.ts'

test('sleep returns the full current state', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'Search',
    focusedIndex: 2,
    uid: 1,
    userName: 'Test User',
  }
  ActivityBarStates.set(1, state, state)

  expect(sleep(1)).toEqual(state)
})
