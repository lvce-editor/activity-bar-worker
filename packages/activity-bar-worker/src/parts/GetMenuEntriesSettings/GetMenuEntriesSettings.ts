import { MenuItemFlags, PlatformType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'

export const LAYOUT_SUBMENU_ID = 32_124

const keyBindingsUri = 'app://keybindings'

export const getMenuEntriesSettings = (state: ActivityBarState): readonly MenuEntry[] => {
  const { platform } = state
  const items = [
    {
      command: 'QuickPick.showEverything',
      flags: MenuItemFlags.None,
      id: 'commandPalette',
      label: ActivityBarStrings.commandPalette(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Preferences.openSettingsJson',
      flags: MenuItemFlags.None,
      id: 'settings',
      label: ActivityBarStrings.settings(),
    },
    {
      args: [keyBindingsUri],
      command: 'Main.openUri',
      flags: MenuItemFlags.None,
      id: 'keyboardShortcuts',
      label: ActivityBarStrings.keyboardShortcuts(),
    },
    {
      command: 'QuickPick.showColorTheme',
      flags: MenuItemFlags.None,
      id: 'colorTheme',
      label: ActivityBarStrings.colorTheme(),
    },
    {
      args: [{ menuId: LAYOUT_SUBMENU_ID }],
      command: '',
      flags: MenuItemFlags.SubMenu,
      id: LAYOUT_SUBMENU_ID,
      label: ActivityBarStrings.layout(),
    },
  ]
  if (platform === PlatformType.Electron) {
    items.push(MenuEntrySeparator.menuEntrySeparator, {
      command: 'AutoUpdater.checkForUpdates',
      flags: MenuItemFlags.None,
      id: 'checkForUpdates',
      label: ActivityBarStrings.checkForUpdates(),
    })
  }
  return items
}

export const getMenuEntriesLayout = (): readonly MenuEntry[] => {
  return [
    {
      args: ['chat2.showIdeLayout'],
      command: 'ExtensionHost.executeCommand',
      flags: MenuItemFlags.None,
      id: 'ideLayout',
      label: ActivityBarStrings.ideLayout(),
    },
    {
      args: ['chat2.showAiNativeLayout'],
      command: 'ExtensionHost.executeCommand',
      flags: MenuItemFlags.None,
      id: 'chatLayout',
      label: ActivityBarStrings.chatLayout(),
    },
    {
      args: ['chat2.showBoardLayout'],
      command: 'ExtensionHost.executeCommand',
      flags: MenuItemFlags.None,
      id: 'boardLayout',
      label: ActivityBarStrings.boardLayout(),
    },
  ]
}
