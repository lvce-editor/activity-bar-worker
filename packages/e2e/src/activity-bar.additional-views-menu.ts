import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.additional-views-menu'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })

  // await
  await Command.execute('ActivityBar.handleClickAdditionalViews', 300, 300)

  const search = Locator('.MenuItem', { hasText: 'Search' })
  const extensions = Locator('.MenuItem', { hasText: 'Extensions' })

  await expect(search).toBeVisible()
  await expect(extensions).toBeVisible()
}
