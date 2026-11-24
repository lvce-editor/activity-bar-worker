import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export const getCustomIconItems = (items: readonly ActivityBarItem[]): readonly ActivityBarItem[] => {
  const seen: Record<string, true | undefined> = Object.create(null)
  return items.filter((item) => {
    const { customIconClass, customIconUrl } = item
    if (!customIconClass || !customIconUrl || seen[customIconClass]) {
      return false
    }
    seen[customIconClass] = true
    return true
  })
}
