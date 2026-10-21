import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.logging-in'

export const test: Test = async ({ ActivityBar, Command, ComponentState, expect, Locator }) => {
  const activityBar = await ComponentState.getComponent('ActivityBar')
  await ActivityBar.setAccountEnabled(true)
  await ActivityBar.setUserLoginState('logging in')
  await Command.execute('ContextMenu.show2', activityBar.uid, 32_122, 0, 0, { menuId: 32_122 })

  const signingIn = Locator('.MenuItem', { hasText: 'Signing In...' })
  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  const signOut = Locator('.MenuItem', { hasText: 'Sign Out' })

  await expect(signingIn).toBeVisible()
  await expect(signIn).toHaveCount(0)
  await expect(signOut).toHaveCount(0)
}
