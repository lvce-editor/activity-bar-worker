export const getIndexFromPosition = (y: number, eventX: number, eventY: number, itemHeight: number, itemCount: number): number => {
  const relativeY = eventY - y
  const index = Math.floor(relativeY / itemHeight)
  if (index < 0 || index >= itemCount) {
    return -1
  }
  return index
}
