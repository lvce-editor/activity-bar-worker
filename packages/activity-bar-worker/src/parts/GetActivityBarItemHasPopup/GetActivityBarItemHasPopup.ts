import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export const getActivityBarItemHasPopup = (item: ActivityBarItem): boolean => {
  return item.id === 'Account' || item.id === 'Settings'
}
