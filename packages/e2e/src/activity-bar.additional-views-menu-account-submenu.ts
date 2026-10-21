import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.additional-views-menu-account-submenu'

export const test: Test = async ({ ActivityBar, Command, ComponentState, expect, Locator }) => {
  const activityBar = await ComponentState.getComponent('ActivityBar')
  await ActivityBar.setAccountEnabled(true)
  await ActivityBar.setUserLoginState('logged out')
  await ActivityBar.resize({
    height: 192,
    width: 48,
    x: 0,
    y: 0,
  })
  await ActivityBar.handleClickAdditionalViews(300, 300)

  const account = Locator('.MenuItem', { hasText: 'Account' })
  await expect(account).toBeVisible()
  await Command.execute('ContextMenu.show2', activityBar.uid, 32_122, 300, 300, { menuId: 32_122 })

  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  await expect(signIn).toBeVisible()
}
