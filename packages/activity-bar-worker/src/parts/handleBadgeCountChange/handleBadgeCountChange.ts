import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'
import { updateItemsWithBadgeCount } from '../UpdateItemsWithBadgeCount/UpdateItemsWithBadgeCount.ts'

const updateStateItems = (state: ActivityBarState, activityBarItems: ActivityBarState['activityBarItems']): ActivityBarState => {
  const { filteredItems: currentFilteredItems } = state
  const itemById = new Map(activityBarItems.map((item) => [item.id, item]))
  const filteredItems = currentFilteredItems.map((item) => itemById.get(item.id) || item)
  return {
    ...state,
    activityBarItems,
    filteredItems,
  }
}

const applyBadgeCountChanges = (state: ActivityBarState, badgeCounts: Readonly<Record<string, number>>): ActivityBarState => {
  const { activityBarItems: currentActivityBarItems } = state
  const activityBarItems = currentActivityBarItems.map((item) => {
    if (!Object.hasOwn(badgeCounts, item.id)) {
      return item
    }
    const badgeCount = badgeCounts[item.id]
    return {
      ...item,
      badgeText: badgeCount ? String(badgeCount) : '',
    }
  })
  return updateStateItems(state, activityBarItems)
}

export const handleBadgeCountChange = async (state: ActivityBarState, badgeCounts?: Readonly<Record<string, number>>): Promise<ActivityBarState> => {
  if (badgeCounts) {
    return applyBadgeCountChanges(state, badgeCounts)
  }
  const { activityBarItems } = state
  const newActivityBarItems = await updateItemsWithBadgeCount(activityBarItems)
  if (newActivityBarItems === activityBarItems) {
    return state
  }
  return updateStateItems(state, newActivityBarItems)
}
