import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-preserves-focus'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.handleBadgeCountChange', { Explorer: 3 })

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const badge = explorer.locator('.ActivityBarItemBadge')
  await expect(explorer).toHaveClass('FocusOutline')
  await expect(badge).toHaveText('3')
}
