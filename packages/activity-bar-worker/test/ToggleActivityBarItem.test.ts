import { test, expect } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleActivityBarItem } from '../src/parts/ToggleActivityBarItem/ToggleActivityBarItem.ts'

test('toggleActivityBarItem should disable an enabled item', async () => {
  const item1 = { flags: ActivityBarItemFlags.Enabled, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' }
  const item2 = { flags: ActivityBarItemFlags.Enabled, icon: 'icon2', id: 'test2', keyShortcuts: '', title: 'Test2' }
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2],
  }

  const result = await toggleActivityBarItem(state, 'test1')

  expect(result.activityBarItems.length).toBe(2)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Enabled).toBe(0)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Enabled).toBe(ActivityBarItemFlags.Enabled)
})

test('toggleActivityBarItem should enable a disabled item', async () => {
  const item1 = { flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' }
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1],
  }

  const result = await toggleActivityBarItem(state, 'test1')

  expect(result.activityBarItems.length).toBe(1)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Enabled).toBe(ActivityBarItemFlags.Enabled)
})

test('toggleActivityBarItem should preserve other item flags', async () => {
  const item1 = {
    flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Button | ActivityBarItemFlags.MarginTop,
    icon: 'icon1',
    id: 'test1',
    keyShortcuts: '',
    title: 'Test1',
  }
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1],
  }

  const result = await toggleActivityBarItem(state, 'test1')

  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Button).toBe(ActivityBarItemFlags.Button)
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.MarginTop).toBe(ActivityBarItemFlags.MarginTop)
})

test('toggleActivityBarItem should keep other state properties', async () => {
  const item1 = { flags: ActivityBarItemFlags.Enabled, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' }
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1],
    currentViewletId: 'viewlet1',
    focus: 5,
    uid: 123,
  }

  const result = await toggleActivityBarItem(state, 'test1')

  expect(result.uid).toBe(123)
  expect(result.focus).toBe(5)
  expect(result.currentViewletId).toBe('viewlet1')
})

test('toggleActivityBarItem should toggle correct item by id', async () => {
  const item1 = { flags: ActivityBarItemFlags.Enabled, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' }
  const item2 = { flags: ActivityBarItemFlags.Enabled, icon: 'icon2', id: 'test2', keyShortcuts: '', title: 'Test2' }
  const item3 = { flags: ActivityBarItemFlags.Enabled, icon: 'icon3', id: 'test3', keyShortcuts: '', title: 'Test3' }
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2, item3],
  }

  const result = await toggleActivityBarItem(state, 'test2')

  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Enabled).toBe(ActivityBarItemFlags.Enabled)
  expect(result.activityBarItems[1].flags & ActivityBarItemFlags.Enabled).toBe(0)
  expect(result.activityBarItems[2].flags & ActivityBarItemFlags.Enabled).toBe(ActivityBarItemFlags.Enabled)
})

test('toggleActivityBarItem should handle multiple toggles', async () => {
  const item1 = { flags: ActivityBarItemFlags.Enabled, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' }
  const item2 = { flags: ActivityBarItemFlags.Enabled, icon: 'icon2', id: 'test2', keyShortcuts: '', title: 'Test2' }
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2],
  }

  const result1 = await toggleActivityBarItem(state, 'test1')
  const result2 = await toggleActivityBarItem(result1, 'test2')

  expect(result2.activityBarItems[0].flags & ActivityBarItemFlags.Enabled).toBe(0)
  expect(result2.activityBarItems[1].flags & ActivityBarItemFlags.Enabled).toBe(0)
})

test('toggleActivityBarItem should accept item id as string', async () => {
  const item1 = { flags: ActivityBarItemFlags.Enabled, icon: 'Explorer', id: 'Explorer', keyShortcuts: '', title: 'Explorer' }
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1],
  }

  const result = await toggleActivityBarItem(state, 'Explorer')

  expect(result.activityBarItems[0].id).toBe('Explorer')
  expect(result.activityBarItems[0].flags & ActivityBarItemFlags.Enabled).toBe(0)
})
