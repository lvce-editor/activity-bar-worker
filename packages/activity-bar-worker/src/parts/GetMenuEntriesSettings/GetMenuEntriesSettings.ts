import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as HelpStrings from '../HelpStrings/HelpStrings.ts'
import * as MenuEntrySeparator from '../MenuEntrySeparator/MenuEntrySeparator.ts'

const keyBindingsUri = 'app://keybindings'

export const getMenuEntriesSettings = (): readonly MenuEntry[] => {
  return [
    {
      id: 'commandPalette',
      label: HelpStrings.commandPalette(),
      flags: MenuItemFlags.None,
      command: 'QuickPick.showEverything',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      id: 'settings',
      label: HelpStrings.settings(),
      flags: MenuItemFlags.None,
      command: 'Preferences.openSettingsJson',
    },
    {
      id: 'keyboardShortcuts',
      label: HelpStrings.keyboardShortcuts(),
      flags: MenuItemFlags.None,
      command: 'Main.openUri',
      args: [keyBindingsUri],
    },
    {
      id: 'colorTheme',
      label: HelpStrings.colorTheme(),
      flags: MenuItemFlags.None,
      command: 'QuickPick.showColorTheme',
    },
    MenuEntrySeparator.menuEntrySeparator,
    {
      id: 'checkForUpdates',
      label: HelpStrings.checkForUpdates(),
      flags: MenuItemFlags.None,
      command: /* TODO */ '-1',
    },
  ]
}
