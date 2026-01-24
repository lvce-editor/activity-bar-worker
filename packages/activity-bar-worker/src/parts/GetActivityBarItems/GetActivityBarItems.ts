import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as Icon from '../Icon/Icon.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const getActivityBarItems = (state: ActivityBarState): readonly ActivityBarItem[] => {
  const { accountEnabled } = state
  const items = [
    // Top
    {
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      icon: Icon.Files,
      id: ViewletModuleId.Explorer,
      keyShortcuts: 'Control+Shift+E',
      title: ViewletActivityBarStrings.explorer(),
    },
    {
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      icon: Icon.Search,
      id: ViewletModuleId.Search,
      keyShortcuts: 'Control+Shift+F',
      title: ViewletActivityBarStrings.search(),
    },
    {
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      icon: Icon.SourceControl,
      id: ViewletModuleId.SourceControl,
      keyShortcuts: 'Control+Shift+G',
      title: ViewletActivityBarStrings.sourceControl(),
    },
    {
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      icon: Icon.DebugAlt2,
      id: ViewletModuleId.RunAndDebug,
      keyShortcuts: 'Control+Shift+D',
      title: ViewletActivityBarStrings.runAndDebug(),
    },
    {
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      icon: Icon.Extensions,
      id: ViewletModuleId.Extensions,
      keyShortcuts: 'Control+Shift+X',
      title: ViewletActivityBarStrings.extensions(),
    },
    // Bottom
  ]

  if (accountEnabled) {
    items.push({
      flags: ActivityBarItemFlags.Button | ActivityBarItemFlags.Enabled | ActivityBarItemFlags.MarginTop,
      icon: Icon.Account,
      id: 'Account',
      keyShortcuts: '',
      title: ViewletActivityBarStrings.account(),
    })
  }

  items.push({
    flags: ActivityBarItemFlags.Button | ActivityBarItemFlags.Enabled | ActivityBarItemFlags.MarginTop,
    icon: Icon.SettingsGear,
    id: 'Settings',
    keyShortcuts: '',
    title: ViewletActivityBarStrings.settings(),
  })

  return items
}
