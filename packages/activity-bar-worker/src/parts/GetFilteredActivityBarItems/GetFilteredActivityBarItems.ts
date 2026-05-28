import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as Icon from '../Icon/Icon.ts'
import { getNumberOfVisibleItems } from '../ViewletActivityBar/ViewletActivityBarGetHiddenItems.ts'

export const getFilteredActivityBarItems = (items: readonly ActivityBarItem[], height: number, itemHeight: number): readonly ActivityBarItem[] => {
  const enabledItems = items.filter((item) => item.flags & ActivityBarItemFlags.Enabled)
  const numberOfVisibleItems = getNumberOfVisibleItems({ height, itemHeight })
  if (numberOfVisibleItems >= enabledItems.length) {
    return enabledItems
  }
  const showMoreItem: ActivityBarItem = {
    flags: ActivityBarItemFlags.Button,
    icon: Icon.Ellipsis,
    id: 'Additional Views',
    keyShortcuts: '',
    title: ViewletActivityBarStrings.additionalViews(),
  }
  return [...enabledItems.slice(0, numberOfVisibleItems - 2), showMoreItem, enabledItems.at(-1)!]
}
