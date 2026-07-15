import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-zero-clears'

export const test: Test = async ({ Command, expect, Locator }) => {
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  const badge = sourceControl.locator('.ActivityBarItemBadge')

  await Command.execute('ActivityBar.handleBadgeCountChange', { 'Source Control': 42 })
  await expect(badge).toHaveText('42')

  await Command.execute('ActivityBar.handleBadgeCountChange', { 'Source Control': 0 })

  await expect(badge).toHaveCount(0)
  await expect(sourceControl).toHaveClass('IconSourceControl')
}
