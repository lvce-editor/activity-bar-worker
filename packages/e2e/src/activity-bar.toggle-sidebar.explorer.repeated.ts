import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-sidebar.explorer.repeated'

export const test: Test = async ({ Command, expect, Locator }) => {
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')
  const sideBar = Locator('.SideBar')
  await Command.execute('Layout.hideSideBar')
  await Command.execute('Layout.hideSecondarySideBar')
  await expect(sideBar).toBeHidden()

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(sideBarHeaderTitle).toHaveText('Explorer')

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(sideBar).toBeHidden()

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(sideBarHeaderTitle).toHaveText('Explorer')

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(sideBar).toBeHidden()

  // act
  await Command.execute(`ActivityBar.handleClickIndex`, 0, 0, 0, 0)

  // assert
  await expect(sideBarHeaderTitle).toHaveText('Explorer')
}
