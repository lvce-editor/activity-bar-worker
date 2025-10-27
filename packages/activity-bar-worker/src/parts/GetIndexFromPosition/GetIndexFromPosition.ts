export const getIndexFromPosition = (eventX: number, eventY: number, itemHeight: number, itemCount: number): number => {
  const index = Math.floor(eventY / itemHeight)
  if (index < 0 || index >= itemCount) {
    return -1
  }
  return index
}
