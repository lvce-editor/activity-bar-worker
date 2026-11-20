import { expect, test } from '@jest/globals'
import { MenuItemFlags, PlatformType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../src/parts/MenuEntry/MenuEntry.ts'
import * as ActivityBarStrings from '../src/parts/ActivityBarStrings/ActivityBarStrings.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntriesSettings, LAYOUT_SUBMENU_ID } from '../src/parts/GetMenuEntriesSettings/GetMenuEntriesSettings.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'

test('getMenuEntriesSettings returns correct menu entries for Web platform', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    platform: PlatformType.Web,
  }

  const result: readonly MenuEntry[] = getMenuEntriesSettings(state)

  expect(result.length).toBe(6)
  expect(result[0]).toEqual({
    command: 'QuickPick.showEverything',
    flags: MenuItemFlags.None,
    id: 'commandPalette',
    label: ActivityBarStrings.commandPalette(),
  })
  expect(result[1]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(result[2]).toEqual({
    command: 'Preferences.openSettingsJson',
    flags: MenuItemFlags.None,
    id: 'settings',
    label: ActivityBarStrings.settings(),
  })
  expect(result[3]).toEqual({
    args: ['app://keybindings'],
    command: 'Main.openUri',
    flags: MenuItemFlags.None,
    id: 'keyboardShortcuts',
    label: ActivityBarStrings.keyboardShortcuts(),
  })
  expect(result[4]).toEqual({
    command: 'QuickPick.showColorTheme',
    flags: MenuItemFlags.None,
    id: 'colorTheme',
    label: ActivityBarStrings.colorTheme(),
  })
  expect(result[5]).toEqual({
    args: [{ menuId: LAYOUT_SUBMENU_ID }],
    command: '',
    flags: MenuItemFlags.SubMenu,
    id: LAYOUT_SUBMENU_ID,
    label: 'Layout',
  })
})

test('getMenuEntriesSettings includes checkForUpdates for Electron platform', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    platform: PlatformType.Electron,
  }

  const result: readonly MenuEntry[] = getMenuEntriesSettings(state)

  expect(result.length).toBe(8)
  expect(result[0]).toEqual({
    command: 'QuickPick.showEverything',
    flags: MenuItemFlags.None,
    id: 'commandPalette',
    label: ActivityBarStrings.commandPalette(),
  })
  expect(result[1]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(result[2]).toEqual({
    command: 'Preferences.openSettingsJson',
    flags: MenuItemFlags.None,
    id: 'settings',
    label: ActivityBarStrings.settings(),
  })
  expect(result[3]).toEqual({
    args: ['app://keybindings'],
    command: 'Main.openUri',
    flags: MenuItemFlags.None,
    id: 'keyboardShortcuts',
    label: ActivityBarStrings.keyboardShortcuts(),
  })
  expect(result[4]).toEqual({
    command: 'QuickPick.showColorTheme',
    flags: MenuItemFlags.None,
    id: 'colorTheme',
    label: ActivityBarStrings.colorTheme(),
  })
  expect(result[6]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(result[7]).toEqual({
    command: 'AutoUpdater.checkForUpdates',
    flags: MenuItemFlags.None,
    id: 'checkForUpdates',
    label: ActivityBarStrings.checkForUpdates(),
  })
})

test('getMenuEntriesSettings does not include checkForUpdates for platform 0', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    platform: 0,
  }

  const result: readonly MenuEntry[] = getMenuEntriesSettings(state)

  expect(result.some((entry) => entry.id === 'checkForUpdates')).toBe(false)
})

test('getMenuEntriesSettings keyboardShortcuts has correct args', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    platform: PlatformType.Web,
  }

  const result: readonly MenuEntry[] = getMenuEntriesSettings(state)

  const keyboardShortcutsEntry = result.find((entry) => entry.id === 'keyboardShortcuts')
  expect(keyboardShortcutsEntry).toBeDefined()
  expect(keyboardShortcutsEntry?.args).toEqual(['app://keybindings'])
})

test('getMenuEntriesSettings all entries have correct flags', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    platform: PlatformType.Web,
  }

  const result: readonly MenuEntry[] = getMenuEntriesSettings(state)

  const nonSeparatorEntries = result.filter((entry) => entry.id !== 'separator' && entry.id !== LAYOUT_SUBMENU_ID)
  for (const entry of nonSeparatorEntries) {
    expect(entry.flags).toBe(MenuItemFlags.None)
  }
})
