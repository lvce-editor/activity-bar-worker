import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-source-control-accessibility'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { 'Source Control': 14 })

  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  const badge = sourceControl.locator('.ActivityBarItemBadge')
  await expect(sourceControl).toHaveAttribute('role', 'tab')
  await expect(sourceControl).toHaveAttribute('aria-selected', 'false')
  await expect(badge).toHaveText('14')
}
