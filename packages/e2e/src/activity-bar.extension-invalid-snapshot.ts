import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.extension-invalid-snapshot'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample.activity-bar-invalid-snapshot'))
  await Command.execute('ActivityBar.handleExtensionsChanged')

  const activityBar = Locator('.ActivityBar')
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await expect(activityBar).toBeVisible()
  await expect(items).toHaveCount(7)
  await expect(explorer).toBeVisible()
  await expect(settings).toBeVisible()
}
