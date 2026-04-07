import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.logging-in'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.setUserLoginState', 'logging in')

  const account = Locator('.ActivityBarItem[title="Account"]')
  await account.click({ button: 'left' })

  const signingIn = Locator('.ContextMenuItem[title="Signing In..."]')
  const signIn = Locator('.ContextMenuItem[title="Sign In"]')
  const signOut = Locator('.ContextMenuItem[title="Sign Out"]')

  await expect(signingIn).toBeVisible()
  await expect(signIn).toHaveCount(0)
  await expect(signOut).toBeVisible()
}
