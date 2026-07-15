import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.extension-invalid-view-entries'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample.activity-bar-invalid-view-entries'))
  await Command.execute('ActivityBar.handleExtensionsChanged')
  await Command.execute('ActivityBar.resize', {
    height: 384,
    width: 48,
    x: 0,
    y: 0,
  })

  const activityBar = Locator('.ActivityBar')
  const items = Locator('.ActivityBarItem')
  const validView = Locator('.ActivityBarItem[title="Valid After Invalid"]')
  await expect(activityBar).toBeVisible()
  await expect(items).toHaveCount(8)
  await expect(validView).toBeVisible()
  await expect(validView).toHaveAttribute('role', 'tab')
}
