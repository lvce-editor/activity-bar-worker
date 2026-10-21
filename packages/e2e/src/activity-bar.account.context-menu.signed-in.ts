import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.signed-in'

export const test: Test = async ({ ActivityBar, Command, ComponentState, expect, Locator }) => {
  const activityBar = await ComponentState.getComponent('ActivityBar')
  await ActivityBar.setAccountEnabled(true)
  await ActivityBar.setUserLoginState('logged in', { provider: 'GitHub', userName: 'test-user' })
  await Command.execute('ContextMenu.show2', activityBar.uid, 32_122, 0, 0, { menuId: 32_122 })

  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  await expect(signIn).toHaveCount(0)

  const account = Locator('.MenuItem', { hasText: 'test-user (GitHub)' })
  await expect(account).toBeVisible()
}
