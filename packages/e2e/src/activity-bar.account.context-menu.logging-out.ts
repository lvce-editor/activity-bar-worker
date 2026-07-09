import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.logging-out'

export const skip = 1

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.setUserLoginState', 'logging out', { provider: 'GitHub', userName: 'SimonSiefke' })
  await Command.execute('ActivityBar.handleClickAccount', 0, 0)

  const signIn = Locator('.ContextMenuItem[title="Sign In"]')
  const signingOut = Locator('.ContextMenuItem[title="Signing Out..."]')
  const account = Locator('.ContextMenuItem[title="SimonSiefke (GitHub)"]')

  await expect(signIn).toHaveCount(0)
  await expect(account).toBeVisible()
  await expect(signingOut).toHaveCount(0)
}
