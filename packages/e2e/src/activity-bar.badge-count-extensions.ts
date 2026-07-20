import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-extensions'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { Extensions: 8 })

  const item = Locator('.ActivityBarItem[title="Extensions"]')
  const badge = item.locator('.ActivityBarItemBadge')
  await expect(item).toHaveAttribute('role', 'tab')
  await expect(badge).toHaveText('8')
}
