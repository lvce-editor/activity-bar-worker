import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'

export const markActiveViews = (items: readonly ActivityBarItem[], activeViewIds: readonly string[]): readonly ActivityBarItem[] => {
  const activeViews: Record<string, true | undefined> = Object.create(null)
  for (const id of activeViewIds) {
    activeViews[id] = true
  }
  return items.map((item) => setFlag(item, ActivityBarItemFlags.Selected, activeViews[item.id] === true))
}
