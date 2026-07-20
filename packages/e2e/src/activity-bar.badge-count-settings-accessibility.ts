import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-settings-accessibility'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { Settings: 3 })

  const settings = Locator('.ActivityBarItem[title="Settings"]')
  const badge = settings.locator('.ActivityBarItemBadge')
  await expect(settings).toHaveAttribute('aria-haspopup', 'true')
  await expect(settings).toHaveAttribute('role', 'button')
  await expect(badge).toHaveText('3')
}
