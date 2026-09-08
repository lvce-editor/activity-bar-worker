import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleActiveViewStateChange } from '../src/parts/HandleActiveViewStateChange/HandleActiveViewStateChange.ts'

const items: readonly ActivityBarItem[] = [
  {
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
    hasPopup: false,
    icon: 'files',
    id: 'Explorer',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Explorer',
  },
  {
    badgeIcon: '',
    badgeText: '',
    customIconClass: '',
    customIconUrl: '',
    enabled: false,
    flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Tab,
    hasPopup: false,
    icon: 'chat',
    id: 'chat.voice',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Voice Chat',
  },
]

test('handleActiveViewStateChange activates an additional view', () => {
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
    filteredItems: items,
  }

  const result = handleActiveViewStateChange(state, 'chat.voice', true)

  expect(result.activityBarItems.every((item) => item.flags & ActivityBarItemFlags.Selected)).toBe(true)
  expect(result.filteredItems).toEqual(result.activityBarItems)
})

test('handleActiveViewStateChange deactivates one view and preserves another', () => {
  const state = {
    ...createDefaultState(),
    activityBarItems: items.map((item) => ({ ...item, flags: item.flags | ActivityBarItemFlags.Selected })),
    filteredItems: items,
  }

  const result = handleActiveViewStateChange(state, 'chat.voice', false)

  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Selected).toBe(ActivityBarItemFlags.Selected)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Selected).toBe(0)
})

test('handleActiveViewStateChange is idempotent when a visible view is already active', () => {
  const state = {
    ...createDefaultState(),
    activityBarItems: items,
  }

  const result = handleActiveViewStateChange(state, 'Explorer', true)

  expect(result.activityBarItems.filter((item) => item.flags & ActivityBarItemFlags.Selected).map((item) => item.id)).toEqual(['Explorer'])
})
