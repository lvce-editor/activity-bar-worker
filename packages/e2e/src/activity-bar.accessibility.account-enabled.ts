import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.accessibility.account-enabled'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)

  const activityBarItems = Locator('.ActivityBarItem')
  await expect(activityBarItems).toHaveCount(7)

  const accountItem = Locator('.ActivityBarItem[title="Account"]')
  await expect(accountItem).toBeVisible()
  await expect(accountItem).toHaveAttribute('role', 'button')
  await expect(accountItem).toHaveAttribute('aria-haspopup', 'true')
  await expect(accountItem).toHaveAttribute('aria-selected', null)

  const settingsItem = Locator('.ActivityBarItem[title="Settings"]')
  await expect(settingsItem).toBeVisible()
  await expect(settingsItem).toHaveAttribute('role', 'button')
  await expect(settingsItem).toHaveAttribute('aria-haspopup', 'true')
  await expect(settingsItem).toHaveAttribute('aria-selected', null)
}
