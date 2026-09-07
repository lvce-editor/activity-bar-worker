import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export const getCustomIconItems = (items: readonly ActivityBarItem[]): readonly ActivityBarItem[] => {
  const seen = new Set<string>()
  return items.filter((item) => {
    const { customIconClass, customIconUrl } = item
    if (!customIconClass || !customIconUrl || seen.has(customIconClass)) {
      return false
    }
    seen.add(customIconClass)
    return true
  })
}
