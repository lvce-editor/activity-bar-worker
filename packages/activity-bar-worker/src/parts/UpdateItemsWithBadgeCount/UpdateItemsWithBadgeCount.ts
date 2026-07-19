import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import { getBadgeText } from '../GetBadgeText/GetBadgeText.ts'

export const updateItemsWithBadgeCount = async (items: readonly ActivityBarItem[]): Promise<readonly ActivityBarItem[]> => {
  try {
    const badgeCounts = await RendererWorker.invoke('Layout.getBadgeCounts')
    const newItems = items.map((item) => {
      const badgeCount = badgeCounts[item.id] || 0
      const badgeText = getBadgeText(badgeCount)
      return {
        ...item,
        badgeText,
      }
    })
    return newItems
  } catch {
    return items
  }
}
