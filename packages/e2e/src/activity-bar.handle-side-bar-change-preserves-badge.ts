import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-change-preserves-badge'

export const test: Test = async ({ Command, expect, Locator }) => {
  const search = Locator('.ActivityBarItem[title="Search"]')
  const badge = search.locator('.ActivityBarItemBadge')

  await Command.execute('ActivityBar.handleBadgeCountChange', { Search: 12 })
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Search', true)

  await expect(search).toHaveAttribute('aria-selected', 'true')
  await expect(badge).toHaveText('12')

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Explorer', true)

  await expect(search).toHaveAttribute('aria-selected', 'false')
  await expect(badge).toHaveText('12')
}
