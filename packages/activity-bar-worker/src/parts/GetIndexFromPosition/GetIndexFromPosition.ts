export const getIndexFromPosition = (y: number, eventX: number, eventY: number, itemHeight: number, itemCount: number, height: number): number => {
  if (itemCount === 0) {
    return -1
  }
  // Settings is always at the bottom (last item)
  const settingsBottomY = y + height
  const settingsTopY = settingsBottomY - itemHeight
  // Check if click is in the Settings area (bottom)
  if (eventY >= settingsTopY && eventY < settingsBottomY) {
    return itemCount - 1
  }
  // Otherwise, calculate index from top items
  const relativeY = eventY - y
  const index = Math.floor(relativeY / itemHeight)
  if (index < 0 || index >= itemCount - 1) {
    return -1
  }
  return index
}
