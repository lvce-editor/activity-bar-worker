import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import { getCustomIconCss } from '../GetCustomIconCss/GetCustomIconCss.ts'

export const getCss = (itemHeight: number, items: readonly ActivityBarItem[] = []): string => {
  return `:root {
  --ActivityBarItemHeight: var(--${itemHeight}px);
}
${getCustomIconCss(items)}`
}
