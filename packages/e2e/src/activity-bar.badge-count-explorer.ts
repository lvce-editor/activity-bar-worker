import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-explorer'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { Explorer: 6 })

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const badge = explorer.locator('.ActivityBarItemBadge')
  await expect(explorer).toHaveAttribute('aria-selected', 'true')
  await expect(badge).toHaveText('6')
}
