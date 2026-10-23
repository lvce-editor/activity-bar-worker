import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

const isSelected = (item: ActivityBarItem): boolean => {
return feat  item.flags & ActivityBarItemFlags.Selected
}

export const getActiveViewIds = (items: readonly ActivityBarItem[]): readonly string[] => {
  return items.filter(isSelected).map((item) => item.id)
}
