import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

const hashString = (value: string): string => {
  let hash = 2_166_136_261
  for (const character of value) {
    hash ^= character.codePointAt(0) || 0
    hash = Math.imul(hash, 16_777_619)
  }
  return (hash >>> 0).toString(36)
}

export const isCustomIconUrl = (icon: string): boolean => {
  return icon.startsWith('http://') || icon.startsWith('https://') || icon.startsWith('file://') || icon.startsWith('/')
}

export const getCustomIconClass = (id: string, iconUrl: string): string => {
  const hashInput = id + '\n' + iconUrl
  return `MaskIconCustomView${hashString(hashInput)}`
}

export const getIconClass = (item: ActivityBarItem, builtinPrefix: string): string => {
  if (item.customIconClass) {
    return item.customIconClass
  }
  return `${builtinPrefix}${item.icon}`
}

export const escapeCssUrl = (url: string): string => {
  return url.replaceAll('\\', '\\\\').replaceAll('"', '\\"').replaceAll('\n', '\\a ').replaceAll('\r', '\\d ').replaceAll('\f', '\\c ')
}

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

export const getCustomIconSignature = (items: readonly ActivityBarItem[]): string => {
  return items
    .map((item) => {
      if (!item.customIconClass || !item.customIconUrl) {
        return ''
      }
      return `${item.customIconClass}\n${item.customIconUrl}`
    })
    .filter(Boolean)
    .join('\n')
}
