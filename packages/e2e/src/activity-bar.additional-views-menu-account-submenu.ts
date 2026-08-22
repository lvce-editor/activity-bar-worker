import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.additional-views-menu-account-submenu'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.setUserLoginState', 'logged out')
  await Command.execute('ActivityBar.resize', {
    height: 192,
    width: 48,
    x: 0,
    y: 0,
  })
  await Command.execute('ActivityBar.handleClickAdditionalViews', 300, 300)

  const account = Locator('.MenuItem', { hasText: 'Account' })
  await expect(account).toBeVisible()
  await Command.execute('ContextMenu.show2', 4, 32_122, 300, 300, { menuId: 32_122 })

  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  await expect(signIn).toBeVisible()
}
