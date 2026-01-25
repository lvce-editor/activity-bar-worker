import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account'

export const test: Test = async ({ Command, expect, Locator }) => {
  // act
  await Command.execute('ActivityBar.setAccountEnabled', true)

  // assert
  const account = Locator('.ActivityBarItem[title="Account"]')
  await expect(account).toBeVisible()
  await expect(account).toHaveClass('IconAccount')
}
