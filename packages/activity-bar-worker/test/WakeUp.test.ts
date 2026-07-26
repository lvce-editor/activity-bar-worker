import { expect, test } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarStates from '../src/parts/ActivityBarStates/ActivityBarStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { wakeUp } from '../src/parts/WakeUp/WakeUp.ts'

test('wakeUp restores the full rendered state', () => {
  const sleepState: ActivityBarState = {
    ...createDefaultState(),
    currentViewletId: 'Search',
    focusedIndex: 2,
    uid: 2,
    userName: 'Test User',
  }

  wakeUp(sleepState)

  expect(ActivityBarStates.get(2)).toEqual({
    newState: sleepState,
    oldState: sleepState,
    scheduledState: sleepState,
  })
})
