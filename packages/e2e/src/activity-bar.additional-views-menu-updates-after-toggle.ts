import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.additional-views-menu-updates-after-toggle'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })
  await ActivityBar.toggleActivityBarItem('Search')
  await Command.execute('ActivityBar.handleClickAdditionalViews', 300, 300)

  const search = Locator('.MenuItem', { hasText: 'Search' })
  const sourceControl = Locator('.MenuItem', { hasText: 'Source Control' })

  await expect(search).toHaveCount(0)
  await expect(sourceControl).toBeVisible()
}
