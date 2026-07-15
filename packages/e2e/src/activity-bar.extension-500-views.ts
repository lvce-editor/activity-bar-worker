import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.extension-500-views'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })

  const uri = import.meta.resolve('../fixtures/sample.activity-bar-many-views')
  await Extension.addWebExtension(uri)
  await Command.execute('ActivityBar.handleExtensionsChanged')

  const activityBar = Locator('.ActivityBar')
  const items = Locator('.ActivityBarItem')
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await expect(activityBar).toBeVisible()
  await expect(items).toHaveCount(3)
  await expect(explorer).toBeVisible()
  await expect(additionalViews).toBeVisible()
  await expect(settings).toBeVisible()

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await expect(explorer).toHaveAttribute('aria-selected', 'true')
}
