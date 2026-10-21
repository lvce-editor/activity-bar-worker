import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-sidebar.explorer'

export const test: Test = async ({ Command, expect, Locator }) => {
  const sideBar = Locator('.SideBar')
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')

  await Command.execute('Layout.hideSideBar')
  await expect(sideBar).toBeHidden()

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await expect(sideBar).toBeVisible()
  await expect(sideBarHeaderTitle).toHaveText('Explorer')

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await expect(sideBar).toBeHidden()

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await expect(sideBar).toBeVisible()
  await expect(sideBarHeaderTitle).toHaveText('Explorer')
}
