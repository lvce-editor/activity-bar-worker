import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-preserved-on-selection'

export const test: Test = async ({ Command, expect, Locator }) => {
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  const badge = sourceControl.locator('.ActivityBarItemBadge')
  await Command.execute('ActivityBar.handleBadgeCountChange', { 'Source Control': 99 })
  await expect(badge).toHaveText('99')

  await Command.execute('ActivityBar.handleClickIndex', 0, 2, 0, 0)

  await expect(sourceControl).toHaveAttribute('aria-selected', 'true')
  await expect(badge).toHaveText('99')
}
