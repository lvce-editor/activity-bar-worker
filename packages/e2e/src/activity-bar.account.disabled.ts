import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.disabled'

export const test: Test = async ({ expect, Locator }) => {
  const account = Locator('.ActivityBarItem[title="Account"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await expect(account).toHaveCount(0)
  await expect(settings).toBeVisible()
  await expect(settings).toHaveClass('MarginTopAuto')
}
