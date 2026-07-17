import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'

export const getVisibleActivityBarItems = (items: readonly ActivityBarItem[], focusedIndex: number): readonly ActivityBarItem[] => {
  return items.map((item, index) => setFlag(item, ActivityBarItemFlags.Focused, index === focusedIndex))
}
