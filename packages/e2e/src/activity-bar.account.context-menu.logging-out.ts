import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.logging-out'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await ActivityBar.setUserLoginState('logging out', { provider: 'GitHub', userName: 'test-user' })
  await ActivityBar.handleClickAccount(0, 0)

  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  const signingOut = Locator('.MenuItem', { hasText: 'Signing Out...' })
  const account = Locator('.MenuItem', { hasText: 'test-user (GitHub)' })

  await expect(signIn).toHaveCount(0)
  await expect(account).toBeVisible()
  await expect(signingOut).toHaveCount(0)
}
