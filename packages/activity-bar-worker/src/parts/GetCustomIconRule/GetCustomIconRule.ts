import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import { escapeCssUrl } from '../EscapeCssUrl/EscapeCssUrl.ts'

export const getCustomIconRule = (item: ActivityBarItem): string => {
  const { customIconClass, customIconUrl } = item
  return `.${customIconClass} {
  mask-image: url("${escapeCssUrl(customIconUrl)}");
}`
}
