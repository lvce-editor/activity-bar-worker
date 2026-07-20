import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-run-and-debug'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { 'Run And Debug': 7 })

  const item = Locator('.ActivityBarItem[title="Run and Debug"]')
  const badge = item.locator('.ActivityBarItemBadge')
  await expect(item).toHaveAttribute('role', 'tab')
  await expect(badge).toHaveText('7')
}
