import { test, expect } from '@jest/globals'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { toggleActivityBarItem } from '../src/parts/ToggleActivityBarItem/ToggleActivityBarItem.ts'

test('toggleActivityBarItem should disable an enabled item', async () => {
  const item1 = { enabled: true, flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' } as any
  const item2 = { enabled: true, flags: 0, icon: 'icon2', id: 'test2', keyShortcuts: '', title: 'Test2' } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.activityBarItems.length).toBe(1)
  expect(result.activityBarItems[0].id).toBe('test2')
})

test('toggleActivityBarItem should enable a disabled item when re-adding', async () => {
  const item1 = { enabled: false, flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.activityBarItems.length).toBe(1)
  expect(result.activityBarItems[0].id).toBe('test1')
})

test('toggleActivityBarItem should filter out disabled items', async () => {
  const item1 = { enabled: true, flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' } as any
  const item2 = { enabled: false, flags: 0, icon: 'icon2', id: 'test2', keyShortcuts: '', title: 'Test2' } as any
  const item3 = { enabled: true, flags: 0, icon: 'icon3', id: 'test3', keyShortcuts: '', title: 'Test3' } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2, item3],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.activityBarItems.length).toBe(1)
  expect(result.activityBarItems[0].id).toBe('test3')
})

test('toggleActivityBarItem should keep other state properties', async () => {
  const item1 = { enabled: true, flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1],
    currentViewletId: 'viewlet1',
    focus: 5,
    uid: 123,
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.uid).toBe(123)
  expect(result.focus).toBe(5)
  expect(result.currentViewletId).toBe('viewlet1')
})

test('toggleActivityBarItem should return all enabled items when item is disabled', async () => {
  const item1 = { enabled: false, flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' } as any
  const item2 = { enabled: true, flags: 0, icon: 'icon2', id: 'test2', keyShortcuts: '', title: 'Test2' } as any
  const item3 = { enabled: true, flags: 0, icon: 'icon3', id: 'test3', keyShortcuts: '', title: 'Test3' } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2, item3],
  }

  const result = await toggleActivityBarItem(state, { label: 'test1' })

  expect(result.activityBarItems.length).toBe(3)
  expect(result.activityBarItems.map((item) => item.id)).toEqual(['test1', 'test2', 'test3'])
})

test('toggleActivityBarItem should handle multiple toggles', async () => {
  const item1 = { enabled: true, flags: 0, icon: 'icon1', id: 'test1', keyShortcuts: '', title: 'Test1' } as any
  const item2 = { enabled: true, flags: 0, icon: 'icon2', id: 'test2', keyShortcuts: '', title: 'Test2' } as any
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [item1, item2],
  }

  const result1 = await toggleActivityBarItem(state, { label: 'test1' })
  const result2 = await toggleActivityBarItem(result1, { label: 'test2' })

  expect(result2.activityBarItems.length).toBe(0)
})
