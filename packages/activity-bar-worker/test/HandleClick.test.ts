import { expect, test } from '@jest/globals'
import { MouseEventType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClick } from '../src/parts/HandleClick/HandleClick.ts'

test('handleClick returns same state for non-left click', async () => {
  const state: ActivityBarState = createDefaultState()
  const result = await handleClick(state, MouseEventType.Keyboard, 0, 10, 20)

  expect(result).toBe(state)
})

test('handleClick throws error for Settings viewlet due to RPC', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'Settings' }],
  }

  await expect(handleClick(state, MouseEventType.LeftClick, 0, 10, 20)).rejects.toThrow()
})

test('handleClick throws error for Additional Views viewlet due to RPC', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'Additional Views' }],
  }

  await expect(handleClick(state, MouseEventType.LeftClick, 0, 10, 20)).rejects.toThrow()
})

test('handleClick throws error for other viewlet due to RPC', async () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ id: 'Explorer' }],
    sideBarVisible: true,
    currentViewletId: 'Explorer',
  }

  await expect(handleClick(state, MouseEventType.LeftClick, 0, 10, 20)).rejects.toThrow()
})