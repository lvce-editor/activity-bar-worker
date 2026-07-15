import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.extension-duplicate-view-ids'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/sample.activity-bar-duplicate-view-ids'))
  await Command.execute('ActivityBar.handleExtensionsChanged')
  await Command.execute('ActivityBar.resize', {
    height: 432,
    width: 48,
    x: 0,
    y: 0,
  })

  const activityBar = Locator('.ActivityBar')
  const duplicateOne = Locator('.ActivityBarItem[title="Duplicate View One"]')
  const duplicateTwo = Locator('.ActivityBarItem[title="Duplicate View Two"]')
  const items = Locator('.ActivityBarItem')

  await expect(activityBar).toBeVisible()
  await expect(items).toHaveCount(9)
  await expect(duplicateOne).toBeVisible()
  await expect(duplicateTwo).toBeVisible()
}
