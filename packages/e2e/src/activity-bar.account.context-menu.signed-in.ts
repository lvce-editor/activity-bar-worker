import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.signed-in'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.setUserLoginState', 'logged in', { provider: 'GitHub', userName: 'SimonSiefke' })
  await Command.execute('ActivityBar.handleClickAccount', 0, 0)

  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  await expect(signIn).toHaveCount(0)

  const account = Locator('.MenuItem', { hasText: 'SimonSiefke (GitHub)' })
  await expect(account).toBeVisible()
}
