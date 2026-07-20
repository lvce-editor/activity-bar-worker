import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-account-item'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const account = Locator('.ActivityBarItem[title="Account"]')
  await ActivityBar.toggleActivityBarItem('Account')
  await expect(account).toHaveCount(0)

  await ActivityBar.toggleActivityBarItem('Account')
  await expect(account).toBeVisible()
}
