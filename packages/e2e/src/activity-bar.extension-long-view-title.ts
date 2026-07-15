import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.extension-long-view-title'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample.activity-bar-long-view-title'))
  await Command.execute('ActivityBar.handleExtensionsChanged')
  await Command.execute('ActivityBar.resize', {
    height: 384,
    width: 48,
    x: 0,
    y: 0,
  })

  const title = 'Activity Bar Long Title '.repeat(500)
  const activityBar = Locator('.ActivityBar')
  const contributedView = Locator('.ActivityBarItem').nth(5)
  const items = Locator('.ActivityBarItem')

  await expect(activityBar).toBeVisible()
  await expect(contributedView).toBeVisible()
  await expect(contributedView).toHaveAttribute('title', title)
  await expect(items).toHaveCount(8)
}
