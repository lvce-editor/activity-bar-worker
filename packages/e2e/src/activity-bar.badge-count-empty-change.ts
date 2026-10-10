import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-empty-change'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  const badges = Locator('.ActivityBarItemBadge')
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const items = Locator('.ActivityBarItem')

  await Command.execute('ActivityBar.handleBadgeCountChange', {})

  await expect(items).toHaveCount(7)
  await expect(badges).toHaveCount(0)
  await expect(explorer).toHaveAttribute('aria-selected', 'true')
}
