import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { setFlag } from '../SetFlag/SetFlag.ts'

export const markSelected = (items: readonly ActivityBarItem[], selectedIndex: number): readonly ActivityBarItem[] => {
  return items.map((item, index) => {
    const isSelected = index === selectedIndex
    return setFlag(item, ActivityBarItemFlags.Selected, isSelected)
  })
}
