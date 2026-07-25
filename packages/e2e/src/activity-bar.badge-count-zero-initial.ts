import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-zero-initial'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { Explorer: 0 })

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const badge = explorer.locator('.ActivityBarItemBadge')
  const icon = explorer.locator('.MaskIconFiles')
  await expect(explorer).toHaveAttribute('aria-selected', 'true')
  await expect(icon).toBeVisible()
  await expect(badge).toHaveCount(0)
}
