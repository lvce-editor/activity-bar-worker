import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleActiveViewStateChange } from '../src/parts/HandleActiveViewStateChange/HandleActiveViewStateChange.ts'

const items: readonly ActivityBarItem[] = [
  {
    flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
    icon: 'files',
    id: 'Explorer',
    keyShortcuts: '',
    title: 'Explorer',
  },
  { flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Tab, icon: 'chat', id: 'chat.voice', keyShortcuts: '', title: 'Voice Chat' },
]

test('handleActiveViewStateChange activates an additional view', () => {
  const state = {
    ...createDefaultState(),
    activeViewIds: ['Explorer'],
    activityBarItems: items,
    filteredItems: items,
  }

  const result = handleActiveViewStateChange(state, 'chat.voice', true)

  expect(result.activeViewIds).toEqual(['Explorer', 'chat.voice'])
  expect(result.activityBarItems.every((item) => item.flags & ActivityBarItemFlags.Selected)).toBe(true)
  expect(result.filteredItems).toEqual(result.activityBarItems)
})

test('handleActiveViewStateChange deactivates one view and preserves another', () => {
  const state = {
    ...createDefaultState(),
    activeViewIds: ['Explorer', 'chat.voice'],
    activityBarItems: items.map((item) => ({ ...item, flags: item.flags | ActivityBarItemFlags.Selected })),
    filteredItems: items,
  }

  const result = handleActiveViewStateChange(state, 'chat.voice', false)

  expect(result.activeViewIds).toEqual(['Explorer'])
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBe(0)
})

test('handleActiveViewStateChange is idempotent when a visible view is already active', () => {
  const state = {
    ...createDefaultState(),
    activeViewIds: ['Explorer'],
    activityBarItems: items,
  }

  const result = handleActiveViewStateChange(state, 'Explorer', true)

  expect(result.activeViewIds).toEqual(['Explorer'])
})
