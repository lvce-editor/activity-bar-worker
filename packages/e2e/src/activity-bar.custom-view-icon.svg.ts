import type { Test } from '@lvce-editor/test-with-playwright'

const hashString = (value: string): string => {
  let hash = 2_166_136_261
  for (const character of value) {
    hash ^= character.codePointAt(0) || 0
    hash = Math.imul(hash, 16_777_619)
  }
  return (hash >>> 0).toString(36)
}

const toExtensionBaseUrl = (uri: string): string => {
  const url = new URL(uri, import.meta.url)
  if (url.protocol === 'file:') {
    return `${location.origin}/remote/${url.href.slice('file://'.length)}/`
  }
  return url.href.endsWith('/') ? url.href : `${url.href}/`
}

export const name = 'activity-bar.custom-view-icon.svg'
export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  const uri = import.meta.resolve('../fixtures/sample.custom-view-icon-svg')
  await Extension.addWebExtension(uri)
  await Command.execute('ActivityBar.handleExtensionsChanged')
  const iconUrl = new URL('src/icon.svg', toExtensionBaseUrl(uri)).href
  const hashInput = `test.views.customIconSvg\n${iconUrl}`
  const customIconClass = `MaskIconCustomView${hashString(hashInput)}`
  const item = Locator('.ActivityBarItem[title="Custom SVG Icon"]')

  await expect(item).toBeVisible()
  await expect(item).toHaveAttribute('role', 'tab')
  await expect(item).toHaveClass(customIconClass)
  await expect(item).toHaveCSS('width', '48px')
  await expect(item).toHaveCSS('height', '48px')
  await expect(item).toHaveCSS('mask-image', `url("${iconUrl}")`)
  await expect(item).toHaveCSS('mask-size', /^24px(?: auto)?$/ as unknown as string)
  await expect(item).toHaveCSS('mask-repeat', 'no-repeat')
  await expect(item).toHaveCSS('mask-position', '50% 50%')
}
