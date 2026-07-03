import type { TestApi } from '@lvce-editor/test-with-playwright'

interface CustomViewIconOptions {
  readonly extensionUri: string
  readonly iconPath: string
  readonly title: string
  readonly viewId: string
}

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

const toExtensionBaseUrl = (uri: string): string => {
  const url = new URL(uri, import.meta.url)
  if (url.protocol === 'file:') {
    return `${location.origin}/remote/${url.href.slice('file://'.length)}/`
  }
  return url.href.endsWith('/') ? url.href : `${url.href}/`
}

export const assertCustomViewIcon = async ({ expect, Locator }: Pick<TestApi, 'expect' | 'Locator'>, options: CustomViewIconOptions): Promise<void> => {
  const { extensionUri, iconPath, title, viewId } = options
  const iconUrl = new URL(`src/${iconPath}`, toExtensionBaseUrl(extensionUri)).href
  const customIconClass = getCustomIconClass(viewId, iconUrl)
  const item = Locator(`.ActivityBarItem[title="${title}"]`)

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
