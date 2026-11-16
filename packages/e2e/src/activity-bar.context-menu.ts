import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  // act
  await ActivityBar.handleContextMenu(300, 300, 0, 0)

  // assert
  const explorer = Locator('.MenuItem', { hasText: 'Explorer' })
  const search = Locator('.MenuItem', { hasText: 'Search' })
  const hideActivityBar = Locator('.MenuItem', { hasText: 'Hide Activity Bar' })

  await expect(explorer).toBeVisible()
  await expect(search).toBeVisible()
  await expect(hideActivityBar).toBeVisible()
}
