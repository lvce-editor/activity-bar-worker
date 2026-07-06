import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export const getIconClass = (item: ActivityBarItem, builtinPrefix: string): string => {
  if (item.customIconClass) {
    return item.customIconClass
  }
  return `${builtinPrefix}${item.icon}`
}
