import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.logging-in'

export const skip = 1

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.setUserLoginState', 'logging in')
  await Command.execute('ActivityBar.handleClickAccount', 0, 0)

  const signingIn = Locator('.ContextMenuItem[title="Signing In..."]')
  const signIn = Locator('.ContextMenuItem[title="Sign In"]')
  const signOut = Locator('.ContextMenuItem[title="Sign Out"]')

  await expect(signingIn).toBeVisible()
  await expect(signIn).toHaveCount(0)
  await expect(signOut).toBeVisible()
}
