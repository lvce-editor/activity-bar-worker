import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.enable-disable'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  // arrange
  const account = Locator('.ActivityBarItem[title="Account"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await ActivityBar.setAccountEnabled(true)
  await expect(account).toBeVisible()

  // act
  await ActivityBar.setAccountEnabled(false)

  // assert
  await expect(account).toHaveCount(0)
  await expect(settings).toHaveClass('MarginTopAuto')
}
