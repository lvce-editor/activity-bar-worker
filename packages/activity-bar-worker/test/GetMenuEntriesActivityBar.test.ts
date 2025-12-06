import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../src/parts/MenuEntry/MenuEntry.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ActivityBarStrings from '../src/parts/ActivityBarStrings/ActivityBarStrings.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntriesActivityBar } from '../src/parts/GetMenuEntriesActivityBar/GetMenuEntriesActivityBar.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as SideBarLocationType from '../src/parts/SideBarLocationType/SideBarLocationType.ts'

test('getMenuEntriesActivityBar returns menu entries with items, separator, move side bar, and hide activity bar', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: ActivityBarItemFlags.Enabled, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarLocation: SideBarLocationType.Left,
  }

  const result: readonly MenuEntry[] = getMenuEntriesActivityBar(state)

  expect(result.length).toBe(5)
  expect(result[0]).toEqual({
    command: '',
    flags: MenuItemFlags.Unchecked,
    id: '',
    label: 'item1',
  })
  expect(result[1]).toEqual({
    command: '',
    flags: MenuItemFlags.Checked,
    id: '',
    label: 'item2',
  })
  expect(result[2]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(result[3]).toEqual({
    command: 'Layout.moveSideBarRight',
    flags: MenuItemFlags.None,
    id: 'moveSideBarRight',
    label: ActivityBarStrings.moveSideBarRight(),
  })
  expect(result[4]).toEqual({
    command: 'Layout.hideActivityBar',
    flags: MenuItemFlags.None,
    id: 'hideActivityBar',
    label: ActivityBarStrings.hideActivityBar(),
  })
})

test('getMenuEntriesActivityBar handles empty items array', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: [],
    sideBarLocation: SideBarLocationType.Left,
  }

  const result: readonly MenuEntry[] = getMenuEntriesActivityBar(state)

  expect(result.length).toBe(3)
  expect(result[0]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(result[1]).toEqual({
    command: 'Layout.moveSideBarRight',
    flags: MenuItemFlags.None,
    id: 'moveSideBarRight',
    label: ActivityBarStrings.moveSideBarRight(),
  })
  expect(result[2]).toEqual({
    command: 'Layout.hideActivityBar',
    flags: MenuItemFlags.None,
    id: 'hideActivityBar',
    label: ActivityBarStrings.hideActivityBar(),
  })
})

test('getMenuEntriesActivityBar uses correct move side bar entry for Right location', () => {
  const items: readonly ActivityBarItem[] = [{ flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' }]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarLocation: SideBarLocationType.Right,
  }

  const result: readonly MenuEntry[] = getMenuEntriesActivityBar(state)

  expect(result.length).toBe(4)
  expect(result[2]).toEqual({
    command: 'Layout.moveSideBarLeft',
    flags: MenuItemFlags.None,
    id: 'moveSideBarLeft',
    label: ActivityBarStrings.moveSideBarLeft(),
  })
})

test('getMenuEntriesActivityBar marks enabled items as checked and disabled items as unchecked', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'item1', keyShortcuts: '', title: 'Item 1' },
    { flags: ActivityBarItemFlags.Enabled, icon: 'icon2', id: 'item2', keyShortcuts: '', title: 'Item 2' },
    { flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected, icon: 'icon3', id: 'item3', keyShortcuts: '', title: 'Item 3' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarLocation: SideBarLocationType.Left,
  }

  const result: readonly MenuEntry[] = getMenuEntriesActivityBar(state)

  expect(result[0].flags).toBe(MenuItemFlags.Unchecked)
  expect(result[1].flags).toBe(MenuItemFlags.Checked)
  expect(result[2].flags).toBe(MenuItemFlags.Checked)
})

test('getMenuEntriesActivityBar uses item id as label', () => {
  const items: readonly ActivityBarItem[] = [
    { flags: 0, icon: 'icon1', id: 'explorer', keyShortcuts: '', title: 'Explorer' },
    { flags: ActivityBarItemFlags.Enabled, icon: 'icon2', id: 'search', keyShortcuts: '', title: 'Search' },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarLocation: SideBarLocationType.Left,
  }

  const result: readonly MenuEntry[] = getMenuEntriesActivityBar(state)

  expect(result[0].label).toBe('explorer')
  expect(result[1].label).toBe('search')
})
