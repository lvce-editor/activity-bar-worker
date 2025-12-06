import { MenuItemFlags, PlatformType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'

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
  ]
  if (platform !== PlatformType.Web) {
    items.push(MenuEntrySeparator.menuEntrySeparator, {
      command: 'AutoUpdater.checkForUpdates',
      flags: MenuItemFlags.None,
      id: 'checkForUpdates',
      label: ActivityBarStrings.checkForUpdates(),
    })
  }
  return items
}
