import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.additional-views-menu-excludes-visible-items'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })
  await Command.execute('ActivityBar.handleClickAdditionalViews', 300, 300)

  const explorer = Locator('.MenuItem', { hasText: 'Explorer' })
  const search = Locator('.MenuItem', { hasText: 'Search' })
  const settings = Locator('.MenuItem', { hasText: 'Settings' })

  await expect(explorer).toHaveCount(0)
  await expect(search).toBeVisible()
  await expect(settings).toHaveCount(0)
}
