import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-sidebar.explorer'

export const test: Test = async ({ Command, expect, Layout, Locator }) => {
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')

  await Command.execute('Layout.hideSideBar')
  await Layout.waitForSideBarVisible(false)

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await Layout.waitForSideBarVisible(true)
  await expect(sideBarHeaderTitle).toHaveText('Explorer')

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await Layout.waitForSideBarVisible(false)

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await Layout.waitForSideBarVisible(true)
  await expect(sideBarHeaderTitle).toHaveText('Explorer')
}
