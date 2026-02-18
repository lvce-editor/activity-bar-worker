import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  // act - enable account item
  await ActivityBar.setAccountEnabled(true)

  // act - click the account item
  const account = Locator('.ActivityBarItem[title="Account"]')
  await account.click({ button: 'left' })

  // assert - context menu should be visible with expected items
  const signIn = Locator('.ContextMenuItem[title="Sign In"]')
  await expect(signIn).toBeVisible()

  const signOut = Locator('.ContextMenuItem[title="Sign Out"]')
  await expect(signOut).toBeVisible()
}
