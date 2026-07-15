import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-negative'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { 'Source Control': -12 })

  const badge = Locator('.ActivityBarItem[title="Source Control"]').locator('.ActivityBarItemBadge')
  await expect(badge).toHaveText('-12')
}
