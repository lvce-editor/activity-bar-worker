import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.bottom-items-margin'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  // arrange
  await ActivityBar.setAccountEnabled(true)
  const account = Locator('.ActivityBarItem[title="Account"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  // assert
  await expect(account).toBeVisible()
  await expect(account).toHaveClass('MarginTopAuto')
  await expect(settings).toBeVisible()
  await expect(settings).toHaveClass('IconSettingsGear')
}
