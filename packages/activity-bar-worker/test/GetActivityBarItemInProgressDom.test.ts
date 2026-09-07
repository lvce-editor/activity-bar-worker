import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { getActivityBarItemInProgressDom } from '../src/parts/GetActivityBarItemInProgressDom/GetActivityBarItemInProgressDom.ts'

test('getActivityBarItemInProgressDom adds ariaHasPopup for settings item', () => {
  const item: ActivityBarItem = {
    flags: 0,
    hasPopup: true,
    icon: 'SettingsGear',
    id: 'Settings',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Settings',
  }

  const result = getActivityBarItemInProgressDom(item)

  expect(result[0].ariaHasPopup).toBe(true)
})

test('getActivityBarItemInProgressDom uses the tab role for tab items', () => {
  const item: ActivityBarItem = {
    flags: ActivityBarItemFlags.Tab,
    icon: 'Files',
    id: 'Explorer',
    keyShortcuts: '',
    preferredLocation: 0,
    title: 'Explorer',
  }

  const result = getActivityBarItemInProgressDom(item)

  expect(result[0].role).toBe(AriaRoles.Tab)
})
