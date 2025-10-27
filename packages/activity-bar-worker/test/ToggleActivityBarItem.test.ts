import { test, expect } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleActivityBarItem } from '../src/parts/ToggleActivityBarItem/ToggleActivityBarItem.ts'

test('toggleActivityBarItem should disable an enabled item', async () => {
  const item1 = { id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '', enabled: true } as any
  const item2 = { id: 'test2', title: 'Test2', icon: 'icon2', flags: 0, keyShortcuts: '', enabled: true } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.activityBarItems.length).toBe(1)
  expect(result.activityBarItems[0].id).toBe('test2')
})

test('toggleActivityBarItem should enable a disabled item when re-adding', async () => {
  const item1 = { id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '', enabled: false } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.activityBarItems.length).toBe(1)
  expect(result.activityBarItems[0].id).toBe('test1')
})

test('toggleActivityBarItem should filter out disabled items', async () => {
  const item1 = { id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '', enabled: true } as any
  const item2 = { id: 'test2', title: 'Test2', icon: 'icon2', flags: 0, keyShortcuts: '', enabled: false } as any
  const item3 = { id: 'test3', title: 'Test3', icon: 'icon3', flags: 0, keyShortcuts: '', enabled: true } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2, item3],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.activityBarItems.length).toBe(1)
  expect(result.activityBarItems[0].id).toBe('test3')
})

test('toggleActivityBarItem should keep other state properties', async () => {
  const item1 = { id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '', enabled: true } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    uid: 123,
    focus: 5,
    currentViewletId: 'viewlet1',
    activityBarItems: [item1],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.uid).toBe(123)
  expect(result.focus).toBe(5)
  expect(result.currentViewletId).toBe('viewlet1')
})

test('toggleActivityBarItem should return all enabled items when item is disabled', async () => {
  const item1 = { id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '', enabled: false } as any
  const item2 = { id: 'test2', title: 'Test2', icon: 'icon2', flags: 0, keyShortcuts: '', enabled: true } as any
  const item3 = { id: 'test3', title: 'Test3', icon: 'icon3', flags: 0, keyShortcuts: '', enabled: true } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2, item3],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.activityBarItems.length).toBe(3)
  expect(result.activityBarItems.map((item) => item.id)).toEqual(['test1', 'test2', 'test3'])
})

test('toggleActivityBarItem should handle multiple toggles', async () => {
  const item1 = { id: 'test1', title: 'Test1', icon: 'icon1', flags: 0, keyShortcuts: '', enabled: true } as any
  const item2 = { id: 'test2', title: 'Test2', icon: 'icon2', flags: 0, keyShortcuts: '', enabled: true } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2],
  }

  const result1 = await toggleActivityBarItem(state, { label: 'test1' })
  const updatedItem2 = { ...item2, enabled: true }
  const state2: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [{ ...item1, enabled: false }, updatedItem2],
  }
  const result2 = await toggleActivityBarItem(result1, { label: 'test2' })

  expect(result2.activityBarItems.length).toBe(0)
})
