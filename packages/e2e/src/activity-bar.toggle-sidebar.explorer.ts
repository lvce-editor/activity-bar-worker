import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-sidebar.explorer'

export const test: Test = async ({ Command, expect, Locator }) => {
  const sideBar = Locator('.SideBar')
  const explorerView = Locator('.SideBar .Viewlet.Explorer')

  await Command.execute('Layout.hideSideBar')
  await expect(sideBar).toBeHidden()

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await expect(sideBar).toBeVisible()
  await expect(explorerView).toBeVisible()

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await expect(sideBar).toBeHidden()

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)
  await expect(sideBar).toBeVisible()
  await expect(explorerView).toBeVisible()
}
