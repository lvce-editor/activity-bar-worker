import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import * as CustomIcon from '../CustomIcon/CustomIcon.ts'

export const getCss = (itemHeight: number, items: readonly ActivityBarItem[] = []): string => {
  return `:root {
  --ActivityBarItemHeight: var(--${itemHeight}px);
}
${CustomIcon.getCustomIconCss(items)}`
}
