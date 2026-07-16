import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-clear-one-preserves-other'

export const test: Test = async ({ Command, expect, Locator }) => {
  const searchBadge = Locator('.ActivityBarItem[title="Search"]').locator('.ActivityBarItemBadge')
  const sourceControlBadge = Locator('.ActivityBarItem[title="Source Control"]').locator('.ActivityBarItemBadge')

  await Command.execute('ActivityBar.handleBadgeCountChange', {
    Search: 3,
    'Source Control': 4,
  })
  await Command.execute('ActivityBar.handleBadgeCountChange', { Search: 0 })

  await expect(searchBadge).toHaveCount(0)
  await expect(sourceControlBadge).toHaveText('4')
}
