import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.unregister-extension-custom-view'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  const extensionId = 'test.custom-view-icon-svg'
  const customView = Locator('.ActivityBarItem[title="Custom SVG Icon"]')

  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample.custom-view-icon-svg'))
  await Command.execute('ActivityBar.handleExtensionsChanged')

  await expect(customView).toBeVisible()

  await Command.execute('Extensions.unregister', extensionId)

  await expect(customView).toHaveCount(0)
}
