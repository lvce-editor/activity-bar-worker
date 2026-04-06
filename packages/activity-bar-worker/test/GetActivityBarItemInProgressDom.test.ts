import { expect, test } from '@jest/globals'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import { getActivityBarItemInProgressDom } from '../src/parts/GetActivityBarItemInProgressDom/GetActivityBarItemInProgressDom.ts'

test('getActivityBarItemInProgressDom adds ariaHasPopup for settings item', () => {
  const item: ActivityBarItem = {
    flags: 0,
    icon: 'SettingsGear',
    id: 'Settings',
    keyShortcuts: '',
    title: 'Settings',
  }

  const result = getActivityBarItemInProgressDom(item)

  expect(result[0].ariaHasPopup).toBe(true)
})
