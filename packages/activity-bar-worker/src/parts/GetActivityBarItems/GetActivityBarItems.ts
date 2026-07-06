import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import type { ContributedView } from '../GetContributedViews/GetContributedViews.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import { getCustomIconClass } from '../GetCustomIconClass/GetCustomIconClass.ts'
import { isCustomIconUrl } from '../IsCustomIconUrl/IsCustomIconUrl.ts'
import * as Icon from '../Icon/Icon.ts'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

const toActivityBarItem = (view: ContributedView): ActivityBarItem => {
  const icon = view.icon || Icon.Extensions
  const customIconUrl = isCustomIconUrl(icon) ? icon : undefined
  const customIconClass = customIconUrl ? getCustomIconClass(view.id, customIconUrl) : undefined
  const item: ActivityBarItem = {
    flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Enabled,
    icon,
    id: view.id,
    keyShortcuts: '',
    title: view.title || view.id,
  }
  if (customIconClass && customIconUrl) {
    return {
      ...item,
      customIconClass,
      customIconUrl,
    }
  }
  return item
}

export const getActivityBarItems = (state: ActivityBarState, contributedViews: readonly ContributedView[] = []): readonly ActivityBarItem[] => {
  const { accountEnabled } = state
  const settingsFlags = ActivityBarItemFlags.Button | ActivityBarItemFlags.Enabled | (accountEnabled ? 0 : ActivityBarItemFlags.MarginTop)
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
    ...contributedViews.map(toActivityBarItem),
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
    flags: settingsFlags,
    icon: Icon.SettingsGear,
    id: 'Settings',
    keyShortcuts: '',
    title: ViewletActivityBarStrings.settings(),
  })

  return items
}
