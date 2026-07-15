import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-partial-update'

export const test: Test = async ({ Command, expect, Locator }) => {
  const searchBadge = Locator('.ActivityBarItem[title="Search"]').locator('.ActivityBarItemBadge')
  const sourceControlBadge = Locator('.ActivityBarItem[title="Source Control"]').locator('.ActivityBarItemBadge')

  await Command.execute('ActivityBar.handleBadgeCountChange', {
    Search: 3,
    'Source Control': 4,
  })
  await Command.execute('ActivityBar.handleBadgeCountChange', { Search: 5 })

  await expect(searchBadge).toHaveText('5')
  await expect(sourceControlBadge).toHaveText('4')
}
