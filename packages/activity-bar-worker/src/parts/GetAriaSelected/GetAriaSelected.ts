export const getAriaSelected = (isTab: number, isSelected: number): boolean | undefined => {
  if (!isTab) {
    return undefined
  }
  return Boolean(isSelected)
}
