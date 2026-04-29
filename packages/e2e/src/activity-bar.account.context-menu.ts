import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account.context-menu'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  // arrange
  await ActivityBar.setAccountEnabled(true)

  // act
  await Command.execute('ActivityBar.handleClickAccount', 0, 0)

  // assert
  const signIn = Locator('.ContextMenuItem[title="Sign In"]')
  await expect(signIn).toBeVisible()

  // TODO check signed out state, maybe separate test
  // const signOut = Locator('.ContextMenuItem[title="Sign Out"]')
  // await expect(signOut).toHaveCount(0)
}
