export const getBadgeText = (badgeCount: number): string => {
  if (badgeCount <= 999) {
    return badgeCount ? String(badgeCount) : ''
  }
  const thousands = badgeCount / 1000
  const roundedDown = Math.floor(thousands)
  return thousands > roundedDown ? `${roundedDown}K+` : `${roundedDown}K`
}
