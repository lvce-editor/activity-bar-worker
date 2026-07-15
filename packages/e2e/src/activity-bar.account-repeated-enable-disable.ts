import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account-repeated-enable-disable'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const account = Locator('.ActivityBarItem[title="Account"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  for (let index = 0; index < 20; index++) {
    await ActivityBar.setAccountEnabled(index % 2 === 0)
  }

  await expect(account).toHaveCount(0)
  await expect(settings).toHaveClass('MarginTopAuto')

  await ActivityBar.setAccountEnabled(true)
  await expect(account).toBeVisible()
  await expect(items).toHaveCount(7)
}
