import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntriesAdditionalViews } from '../src/parts/GetMenuEntriesAdditionalViews/GetMenuEntriesAdditionalViews.ts'

test('getMenuEntriesAdditionalViews returns empty array when no items are hidden', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    height: 400,
    itemHeight: 48,
  }

  const result = getMenuEntriesAdditionalViews(state)

  expect(result).toEqual([])
})

test('getMenuEntriesAdditionalViews returns empty array when all items fit in visible area', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
    { flags: 0, icon: 'icon5', id: 'item5', keyShortcuts: '', title: 'Item 5' },
    { flags: 0, icon: 'icon6', id: 'item6', keyShortcuts: '', title: 'Item 6' },
    { flags: 0, icon: 'icon7', id: 'item7', keyShortcuts: '', title: 'Item 7' },
    { flags: 0, icon: 'icon8', id: 'item8', keyShortcuts: '', title: 'Item 8' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    height: 400,
    itemHeight: 48,
  }

  const result = getMenuEntriesAdditionalViews(state)

  expect(result).toEqual([])
})

test('getMenuEntriesAdditionalViews returns menu entries for hidden items', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
    { flags: 0, icon: 'icon5', id: 'item5', keyShortcuts: '', title: 'Item 5' },
    { flags: 0, icon: 'icon6', id: 'item6', keyShortcuts: '', title: 'Item 6' },
    { flags: 0, icon: 'icon7', id: 'item7', keyShortcuts: '', title: 'Item 7' },
    { flags: 0, icon: 'icon8', id: 'item8', keyShortcuts: '', title: 'Item 8' },
    { flags: 0, icon: 'icon9', id: 'item9', keyShortcuts: '', title: 'Item 9' },
    { flags: 0, icon: 'icon10', id: 'item10', keyShortcuts: '', title: 'Item 10' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    height: 400,
    itemHeight: 48,
  }

  const result = getMenuEntriesAdditionalViews(state)

  expect(result.length).toBeGreaterThan(0)
  expect(result[0].command).toBe('-1')
  expect(result[0].flags).toBe(MenuItemFlags.None)
  expect(result[0].id).toBe('8000')
  expect(result[0].label).toBe('item7')
})

test('getMenuEntriesAdditionalViews maps hidden items to menu entries with correct structure', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
    { flags: 0, icon: 'icon5', id: 'item5', keyShortcuts: '', title: 'Item 5' },
    { flags: 0, icon: 'icon6', id: 'item6', keyShortcuts: '', title: 'Item 6' },
    { flags: 0, icon: 'icon7', id: 'item7', keyShortcuts: '', title: 'Item 7' },
    { flags: 0, icon: 'icon8', id: 'item8', keyShortcuts: '', title: 'Item 8' },
    { flags: 0, icon: 'icon9', id: 'item9', keyShortcuts: '', title: 'Item 9' },
    { flags: 0, icon: 'icon10', id: 'item10', keyShortcuts: '', title: 'Item 10' },
    { flags: 0, icon: 'icon11', id: 'item11', keyShortcuts: '', title: 'Item 11' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    height: 400,
    itemHeight: 48,
  }

  const result = getMenuEntriesAdditionalViews(state)

  for (const entry of result) {
    expect(entry.command).toBe('-1')
    expect(entry.flags).toBe(MenuItemFlags.None)
    expect(entry.id).toBe('8000')
    expect(typeof entry.label).toBe('string')
  }
})

test('getMenuEntriesAdditionalViews uses item id as label', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'custom-id-1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'custom-id-2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'custom-id-3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'custom-id-4', keyShortcuts: '', title: 'Item 4' },
    { flags: 0, icon: 'icon5', id: 'custom-id-5', keyShortcuts: '', title: 'Item 5' },
    { flags: 0, icon: 'icon6', id: 'custom-id-6', keyShortcuts: '', title: 'Item 6' },
    { flags: 0, icon: 'icon7', id: 'custom-id-7', keyShortcuts: '', title: 'Item 7' },
    { flags: 0, icon: 'icon8', id: 'custom-id-8', keyShortcuts: '', title: 'Item 8' },
    { flags: 0, icon: 'icon9', id: 'custom-id-9', keyShortcuts: '', title: 'Item 9' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    height: 400,
    itemHeight: 48,
  }

  const result = getMenuEntriesAdditionalViews(state)

  expect(result.length).toBeGreaterThan(0)
  expect(result[0].label).toBe('custom-id-7')
})

test('getMenuEntriesAdditionalViews handles different height and itemHeight values', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: 0, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: 0, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
    { flags: 0, icon: 'icon4', id: 'item4', keyShortcuts: '', title: 'Item 4' },
    { flags: 0, icon: 'icon5', id: 'item5', keyShortcuts: '', title: 'Item 5' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    height: 100,
    itemHeight: 50,
  }

  const result = getMenuEntriesAdditionalViews(state)

  expect(result.length).toBe(4)
  expect(result[0].label).toBe('item1')
  expect(result[1].label).toBe('item2')
  expect(result[2].label).toBe('item3')
  expect(result[3].label).toBe('item4')
})

test('getMenuEntriesAdditionalViews handles many items', () => {
  const items: readonly ActivityBarItem[] = Array.from({ length: 20 }, (_, i) => ({
    flags: 0,
    icon: `icon${i + 1}`,
    id: `item${i + 1}`,
    keyShortcuts: '',
    title: `Item ${i + 1}`,
  }))

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    height: 400,
    itemHeight: 48,
  }

  const result = getMenuEntriesAdditionalViews(state)

  expect(result.length).toBeGreaterThan(0)
  expect(result.every((entry) => entry.command === '-1')).toBe(true)
  expect(result.every((entry) => entry.flags === MenuItemFlags.None)).toBe(true)
  expect(result.every((entry) => entry.id === '8000')).toBe(true)
})
