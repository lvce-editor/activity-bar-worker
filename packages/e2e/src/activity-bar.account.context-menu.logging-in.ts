import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.logging-in'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.setUserLoginState', 'logging in')
  await Command.execute('ActivityBar.handleClickAccount', 0, 0)

  const signingIn = Locator('.MenuItem', { hasText: 'Signing In...' })
  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  const signOut = Locator('.MenuItem', { hasText: 'Sign Out' })

  await expect(signingIn).toBeVisible()
  await expect(signIn).toHaveCount(0)
  await expect(signOut).toHaveCount(0)
}
