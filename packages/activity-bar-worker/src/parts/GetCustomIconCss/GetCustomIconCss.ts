import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import { getCustomIconItems } from '../GetCustomIconItems/GetCustomIconItems.ts'
import { getCustomIconRule } from '../GetCustomIconRule/GetCustomIconRule.ts'

export const getCustomIconCss = (items: readonly ActivityBarItem[]): string => {
  const customIconItems = getCustomIconItems(items)
  const cssRules = customIconItems.map(getCustomIconRule)
  return cssRules.join('\n')
}
