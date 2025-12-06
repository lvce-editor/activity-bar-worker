import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const handleBadgeCountChange = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { filteredItems } = state
  const badgeCounts = await RendererWorker.invoke('Layout.getBadgeCounts')
  const newItems = filteredItems.map((item) => {
    const badgeCount = badgeCounts[item.id] || 0
    const badgeText = badgeCount ? `${badgeCount}` : ''
    return {
      ...item,
      badgeText,
    }
  })
  return {
    ...state,
    filteredItems: newItems,
  }
}
