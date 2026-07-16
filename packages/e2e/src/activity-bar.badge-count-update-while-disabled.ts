import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-update-while-disabled'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const search = Locator('.ActivityBarItem[title="Search"]')

  await ActivityBar.toggleActivityBarItem('Search')
  await expect(search).toHaveCount(0)

  await Command.execute('ActivityBar.handleBadgeCountChange', { Search: 17 })
  await ActivityBar.toggleActivityBarItem('Search')

  await expect(search).toBeVisible()
  await expect(search.locator('.ActivityBarItemBadge')).toHaveText('17')
}
