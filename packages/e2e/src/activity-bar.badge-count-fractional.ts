import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-fractional'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { Search: 1.5 })

  const badge = Locator('.ActivityBarItem[title="Search"]').locator('.ActivityBarItemBadge')
  await expect(badge).toHaveText('1.5')
}
