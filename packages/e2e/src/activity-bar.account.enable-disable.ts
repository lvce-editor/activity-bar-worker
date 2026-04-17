import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.enable-disable'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const account = Locator('.ActivityBarItem[title="Account"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await ActivityBar.setAccountEnabled(true)
  await expect(account).toBeVisible()
  await expect(settings).not.toHaveClass('MarginTopAuto')

  await ActivityBar.setAccountEnabled(false)
  await expect(account).toHaveCount(0)
  await expect(settings).toHaveClass('MarginTopAuto')
}
