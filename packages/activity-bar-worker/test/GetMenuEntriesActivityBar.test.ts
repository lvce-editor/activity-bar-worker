import { expect, test } from '@jest/globals'
import { MenuItemFlags, SideBarLocationType } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../src/parts/MenuEntry/MenuEntry.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ActivityBarStrings from '../src/parts/ActivityBarStrings/ActivityBarStrings.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntriesActivityBar } from '../src/parts/GetMenuEntriesActivityBar/GetMenuEntriesActivityBar.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'

test('getMenuEntriesActivityBar returns menu entries with items, separator, move side bar, and hide activity bar', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Enabled,
      hasPopup: false,
      icon: 'icon2',
      id: 'item2',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 2',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarLocation: SideBarLocationType.Left,
  }

  const result: readonly MenuEntry[] = getMenuEntriesActivityBar(state)

  expect(result.length).toBe(5)
  expect(result[0]).toEqual({
    args: ['item1'],
    command: 'ActivityBar.toggleActivityBarItem',
    flags: MenuItemFlags.Unchecked,
    id: 'toggle-item1',
    label: 'Item 1',
  })
  expect(result[1]).toEqual({
    args: ['item2'],
    command: 'ActivityBar.toggleActivityBarItem',
    flags: MenuItemFlags.Checked,
    id: 'toggle-item2',
    label: 'Item 2',
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

test('getMenuEntriesActivityBar inserts a separator before bottom utility items', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Button | ActivityBarItemFlags.Enabled | ActivityBarItemFlags.MarginTop,
      hasPopup: false,
      icon: 'icon2',
      id: 'Account',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Account',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Button | ActivityBarItemFlags.Enabled,
      hasPopup: false,
      icon: 'icon3',
      id: 'Settings',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Settings',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarLocation: SideBarLocationType.Left,
  }

  const result: readonly MenuEntry[] = getMenuEntriesActivityBar(state)

  expect(result).toEqual([
    {
      args: ['item1'],
      command: 'ActivityBar.toggleActivityBarItem',
      flags: MenuItemFlags.Checked,
      id: 'toggle-item1',
      label: 'Item 1',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      args: ['Account'],
      command: 'ActivityBar.toggleActivityBarItem',
      flags: MenuItemFlags.Checked,
      id: 'toggle-Account',
      label: 'Account',
    },
    {
      args: ['Settings'],
      command: 'ActivityBar.toggleActivityBarItem',
      flags: MenuItemFlags.Checked,
      id: 'toggle-Settings',
      label: 'Settings',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Layout.moveSideBarRight',
      flags: MenuItemFlags.None,
      id: 'moveSideBarRight',
      label: ActivityBarStrings.moveSideBarRight(),
    },
    {
      command: 'Layout.hideActivityBar',
      flags: MenuItemFlags.None,
      id: 'hideActivityBar',
      label: ActivityBarStrings.hideActivityBar(),
    },
  ])
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
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
  ]

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
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'icon1',
      id: 'item1',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 1',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Enabled,
      hasPopup: false,
      icon: 'icon2',
      id: 'item2',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 2',
    },
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: ActivityBarItemFlags.Enabled | ActivityBarItemFlags.Selected,
      hasPopup: false,
      icon: 'icon3',
      id: 'item3',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Item 3',
    },
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

test('getMenuEntriesActivityBar uses item title as label', () => {
  const items: readonly ActivityBarItem[] = [
    {
      badgeIcon: '',
      badgeText: '',
      customIconClass: '',
      customIconUrl: '',
      enabled: false,
      flags: 0,
      hasPopup: false,
      icon: 'icon1',
      id: 'explorer',
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
      flags: ActivityBarItemFlags.Enabled,
      hasPopup: false,
      icon: 'icon2',
      id: 'search',
      keyShortcuts: '',
      preferredLocation: 0,
      title: 'Search',
    },
  ]

  const state: ActivityBarState = {
    ...createDefaultState(),
    activityBarItems: items,
    sideBarLocation: SideBarLocationType.Left,
  }

  const result: readonly MenuEntry[] = getMenuEntriesActivityBar(state)

  expect(result[0].label).toBe('Explorer')
  expect(result[1].label).toBe('Search')
})
