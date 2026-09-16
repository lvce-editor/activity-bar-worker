import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'

export const isMovableActivityBarItem = (item: ActivityBarItem | undefined): boolean => {
  return Boolean(item && item.flags & ActivityBarItemFlags.Tab && item.id !== 'Additional Views')
}
