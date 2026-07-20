import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-all-top-items'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', {
    Explorer: 1,
    Extensions: 5,
    'Run And Debug': 4,
    Search: 2,
    'Source Control': 3,
  })

  const badges = Locator('.ActivityBarItemBadge')
  await expect(badges).toHaveCount(5)
}
