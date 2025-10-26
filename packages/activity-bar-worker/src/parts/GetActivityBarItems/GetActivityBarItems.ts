import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as Icon from '../Icon/Icon.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const getActivityBarItems = (): readonly ActivityBarItem[] => {
  return [
    // Top
    {
      id: ViewletModuleId.Explorer,
      title: ViewletActivityBarStrings.explorer(),
      icon: Icon.Files,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      keyShortcuts: 'Control+Shift+E',
    },
    {
      id: ViewletModuleId.Search,
      title: ViewletActivityBarStrings.search(),
      icon: Icon.Search,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      keyShortcuts: 'Control+Shift+F',
    },
    {
      id: ViewletModuleId.SourceControl,
      title: ViewletActivityBarStrings.sourceControl(),
      icon: Icon.SourceControl,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      keyShortcuts: 'Control+Shift+G',
    },
    {
      id: ViewletModuleId.RunAndDebug,
      title: ViewletActivityBarStrings.runAndDebug(),
      icon: Icon.DebugAlt2,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      keyShortcuts: 'Control+Shift+D',
    },
    {
      id: ViewletModuleId.Extensions,
      title: ViewletActivityBarStrings.extensions(),
      icon: Icon.Extensions,
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
      keyShortcuts: 'Control+Shift+X',
    },
    // Bottom
    {
      id: 'Settings',
      title: ViewletActivityBarStrings.settings(),
      icon: Icon.SettingsGear,
      flags: ActivityBarItemFlags.Button | ActivityBarItemFlags.Enabled | ActivityBarItemFlags.MarginTop,
      keyShortcuts: '',
    },
  ]
}
