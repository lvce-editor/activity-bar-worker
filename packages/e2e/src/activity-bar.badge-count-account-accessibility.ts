import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-account-accessibility'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', { Account: 2 })

  const account = Locator('.ActivityBarItem[title="Account"]')
  const badge = account.locator('.ActivityBarItemBadge')
  await expect(account).toHaveAttribute('aria-haspopup', 'true')
  await expect(account).toHaveAttribute('role', 'button')
  await expect(badge).toHaveText('2')
}
