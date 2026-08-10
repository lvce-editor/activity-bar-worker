import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

export const getActiveViewIds = (items: readonly ActivityBarItem[]): readonly string[] => {
  return items.filter((item) => item.flags & ActivityBarItemFlags.Selected).map((item) => item.id)
}
