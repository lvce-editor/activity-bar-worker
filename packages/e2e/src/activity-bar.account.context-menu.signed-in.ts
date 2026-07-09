import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu.signed-in'

export const skip = 1

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const activityBar = ActivityBar as typeof ActivityBar & {
    setUserLoginState(state: 'logged in', userInfo?: unknown): Promise<void>
  }

  await ActivityBar.setAccountEnabled(true)
  await activityBar.setUserLoginState('logged in', { provider: 'GitHub', userName: 'SimonSiefke' })
  await Command.execute('ActivityBar.handleClickAccount', 0, 0)

  const signIn = Locator('.ContextMenuItem[title="Sign In"]')
  await expect(signIn).toHaveCount(0)

  const account = Locator('.ContextMenuItem[title="SimonSiefke (GitHub)"]')
  await expect(account).toBeVisible()
}
