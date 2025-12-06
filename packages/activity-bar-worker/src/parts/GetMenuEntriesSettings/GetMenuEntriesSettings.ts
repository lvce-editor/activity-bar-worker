import { MenuItemFlags, PlatformType } from '@lvce-editor/constants'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as HelpStrings from '../HelpStrings/HelpStrings.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'

const keyBindingsUri = 'app://keybindings'

export const getMenuEntriesSettings = (state: ActivityBarState): readonly MenuEntry[] => {
  const { platform } = state
  const items = [
    {
      command: 'QuickPick.showEverything',
      flags: MenuItemFlags.None,
      id: 'commandPalette',
      label: HelpStrings.commandPalette(),
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      command: 'Preferences.openSettingsJson',
      flags: MenuItemFlags.None,
      id: 'settings',
      label: HelpStrings.settings(),
    },
    {
      args: [keyBindingsUri],
      command: 'Main.openUri',
      flags: MenuItemFlags.None,
      id: 'keyboardShortcuts',
      label: HelpStrings.keyboardShortcuts(),
    },
    {
      command: 'QuickPick.showColorTheme',
      flags: MenuItemFlags.None,
      id: 'colorTheme',
      label: HelpStrings.colorTheme(),
    },
  ]
  if (platform !== PlatformType.Web) {
    items.push(MenuEntrySeparator.menuEntrySeparator, {
      command: 'AutoUpdater.checkForUpdates',
      flags: MenuItemFlags.None,
      id: 'checkForUpdates',
      label: HelpStrings.checkForUpdates(),
    })
  }
  return items
}
