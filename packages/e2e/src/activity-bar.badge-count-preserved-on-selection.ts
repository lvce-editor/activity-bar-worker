import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-preserved-on-selection'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  const badge = sourceControl.locator('.ActivityBarItemBadge')
  await Command.execute('Layout.setBadgeCount', 'Source Control', 9)
  await expect(badge).toHaveText('9')

  await ActivityBar.handleClick(2)

  await expect(sourceControl).toHaveAttribute('aria-selected', 'true')
  await expect(badge).toHaveText('9')
}
