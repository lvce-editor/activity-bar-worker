import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-sidebar.explorer.repeated'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorerView = Locator('.SideBar .Viewlet.Explorer')
  const sideBar = Locator('.SideBar')
  await Command.execute('Layout.hideSideBar')
  await Command.execute('Layout.hideSecondarySideBar')
  await expect(sideBar).toBeHidden()

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(explorerView).toBeVisible()

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(sideBar).toBeHidden()

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(explorerView).toBeVisible()

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(sideBar).toBeHidden()

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(explorerView).toBeVisible()
}
