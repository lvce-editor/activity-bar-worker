import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-replaced'

export const test: Test = async ({ Command, expect, Locator }) => {
  const search = Locator('.ActivityBarItem[title="Search"]')
  const badges = search.locator('.ActivityBarItemBadge')

  await Command.execute('ActivityBar.handleBadgeCountChange', { Search: 1 })
  await expect(badges).toHaveText('1')

  await Command.execute('ActivityBar.handleBadgeCountChange', { Search: 12 })
  await expect(badges).toHaveCount(1)
  await expect(badges).toHaveText('12')
}
