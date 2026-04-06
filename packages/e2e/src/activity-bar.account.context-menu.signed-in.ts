import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.signed-in'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const activityBar = ActivityBar as typeof ActivityBar & {
    setUserLoginState(state: 'logged in'): Promise<void>
  }

  await ActivityBar.setAccountEnabled(true)
  await activityBar.setUserLoginState('logged in')

  const account = Locator('.ActivityBarItem[title="Account"]')
  await account.click({ button: 'left' })

  const signIn = Locator('.ContextMenuItem[title="Sign In"]')
  await expect(signIn).toHaveCount(0)

  const signOut = Locator('.ContextMenuItem[title="Sign Out"]')
  await expect(signOut).toBeVisible()
}
