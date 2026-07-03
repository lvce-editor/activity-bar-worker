import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.custom-view-icon.missing-image'

const extensionId = 'test.custom-view-icon-missing-image'
const viewId = 'test.views.customIconMissingImage'
const title = 'Custom Missing Image Icon'
const iconPath = 'missing.png'

const hashString = (value: string): string => {
  let hash = 0x811c9dc5
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(36)
}

const getCustomIconClass = (id: string, iconUrl: string): string => {
  return `MaskIconCustomView${hashString(`${id}\n${iconUrl}`)}`
}

const toRemoteUrl = (path: string): string => {
  return `${location.origin}/remote/${new URL(`file://${path}`).href.slice(8)}`
}

export const test: Test = async ({ Command, expect, Locator }) => {
  const extensions = await Command.execute('WebView.compatSharedProcessInvoke', 'ExtensionManagement.getAllExtensions')
  const extension = extensions.find((extension) => extension.id === extensionId)
  const iconUrl = `${toRemoteUrl(extension.path)}/src/${iconPath}`
  const customIconClass = getCustomIconClass(viewId, iconUrl)
  const item = Locator(`.ActivityBarItem[title="${title}"]`)

  await expect(item).toBeVisible()
  await expect(item).toHaveAttribute('role', 'tab')
  await expect(item).toHaveClass(customIconClass)
  await expect(item).toHaveCSS('width', '48px')
  await expect(item).toHaveCSS('height', '48px')
  await expect(item).toHaveCSS('mask-image', `url("${iconUrl}")`)
  await expect(item).toHaveCSS('mask-size', '24px')
  await expect(item).toHaveCSS('mask-repeat', 'no-repeat')
  await expect(item).toHaveCSS('mask-position', '50% 50%')
}
