import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.signed-in'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await ActivityBar.setUserLoginState('logged in', { provider: 'GitHub', userName: 'test-user' })
  await ActivityBar.handleClickAccount(0, 0)

  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  await expect(signIn).toHaveCount(0)

  const account = Locator('.MenuItem', { hasText: 'test-user (GitHub)' })
  await expect(account).toBeVisible()
}
