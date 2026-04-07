import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.logging-out'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.setUserLoginState', 'logging out')

  const account = Locator('.ActivityBarItem[title="Account"]')
  await account.click({ button: 'left' })

  const signIn = Locator('.ContextMenuItem[title="Sign In"]')
  const signingOut = Locator('.ContextMenuItem[title="Signing Out..."]')
  const signOut = Locator('.ContextMenuItem[title="Sign Out"]')

  await expect(signIn).toBeVisible()
  await expect(signingOut).toBeVisible()
  await expect(signOut).toHaveCount(0)
}
