import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-hidden-preserves-badge'

export const test: Test = async ({ Command, expect, Locator }) => {
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  const badge = sourceControl.locator('.ActivityBarItemBadge')

  await Command.execute('ActivityBar.handleBadgeCountChange', { 'Source Control': 8 })
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Explorer', false)

  await expect(sourceControl).toHaveAttribute('aria-selected', 'false')
  await expect(badge).toHaveText('8')
}
