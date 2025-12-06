import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as Icon from '../Icon/Icon.ts'
import { getNumberOfVisibleItems } from '../ViewletActivityBar/ViewletActivityBarGetHiddenItems.ts'

export const getFilteredActivityBarItems = (items: readonly ActivityBarItem[], height: number, itemHeight: number): readonly ActivityBarItem[] => {
  const numberOfVisibleItems = getNumberOfVisibleItems({ height, itemHeight })
  if (numberOfVisibleItems >= items.length) {
    return items
  }
  const showMoreItem: ActivityBarItem = {
    flags: ActivityBarItemFlags.Button,
    icon: Icon.Ellipsis,
    id: 'Additional Views',
    keyShortcuts: '',
    title: ViewletActivityBarStrings.additionalViews(),
  }
  return [...items.slice(0, numberOfVisibleItems - 2), showMoreItem, items.at(-1)!]
}
