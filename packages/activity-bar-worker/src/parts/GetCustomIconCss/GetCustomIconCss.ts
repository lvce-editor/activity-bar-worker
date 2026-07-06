import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'
import { escapeCssUrl } from '../EscapeCssUrl/EscapeCssUrl.ts'

export const getCustomIconCss = (items: readonly ActivityBarItem[]): string => {
  const seen = new Set<string>()
  let css = ''
  for (const item of items) {
    const { customIconClass, customIconUrl } = item
    if (!customIconClass || !customIconUrl || seen.has(customIconClass)) {
      continue
    }
    seen.add(customIconClass)
    css += `.${customIconClass} {
  mask-image: url("${escapeCssUrl(customIconUrl)}");
}
`
  }
  return css
}
