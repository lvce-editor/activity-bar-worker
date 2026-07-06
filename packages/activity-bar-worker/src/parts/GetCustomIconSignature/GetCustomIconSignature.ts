import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export const getCustomIconSignature = (items: readonly ActivityBarItem[]): string => {
  return items
    .map((item) => {
      if (!item.customIconClass || !item.customIconUrl) {
        return ''
      }
      return `${item.customIconClass}\n${item.customIconUrl}`
    })
    .filter(Boolean)
    .join('\n')
}
