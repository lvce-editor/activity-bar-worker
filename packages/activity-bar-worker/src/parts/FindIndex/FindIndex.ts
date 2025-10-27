import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export const findIndex = (activityBarItems: readonly ActivityBarItem[], id: string): number => {
  for (let i = 0; i < activityBarItems.length; i++) {
    if (activityBarItems[i].id === id) {
      return i
    }
  }
  return -1
}
