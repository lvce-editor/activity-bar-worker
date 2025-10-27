import { expect, test } from '@jest/globals'
import { MouseEventType } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClick } from '../src/parts/HandleClick/HandleClick.ts'

test.skip('handleClick returns same state for non-left click', async () => {
  const state: ActivityBarState = createDefaultState()
  const result = await handleClick(state, MouseEventType.Keyboard, 10, 20)

  expect(result).toBe(state)
})

test.skip('handleClick throws error for Settings viewlet due to RPC', async () => {
  const items: readonly ActivityBarItem[] = [{ id: 'Settings', title: 'Settings', icon: 'icon', flags: 0, keyShortcuts: '' }]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
  }

  await expect(handleClick(state, MouseEventType.LeftClick, 10, 20)).rejects.toThrow()
})

test.skip('handleClick throws error for Additional Views viewlet due to RPC', async () => {
  const items: readonly ActivityBarItem[] = [{ id: 'Additional Views', title: 'Additional Views', icon: 'icon', flags: 0, keyShortcuts: '' }]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
  }

  await expect(handleClick(state, MouseEventType.LeftClick, 10, 20)).rejects.toThrow()
})

test.skip('handleClick throws error for other viewlet due to RPC', async () => {
  const items: readonly ActivityBarItem[] = [{ id: 'Explorer', title: 'Explorer', icon: 'icon', flags: 0, keyShortcuts: '' }]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarVisible: true,
    currentViewletId: 'Explorer',
  }

  await expect(handleClick(state, MouseEventType.LeftClick, 10, 20)).rejects.toThrow()
})
