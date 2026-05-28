import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.sidebar-hide.quick-pick.clears-selection'

export const skip = 1

export const test: Test = async ({ expect, Layout, Locator, QuickPick }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const quickPick = Locator('.QuickPick')
  const sideBar = Locator('.SideBar')
  const toggleSideBarCommand = '>Layout: Toggle Side Bar'

  // arrange
  await Layout.showSideBar()
  await expect(sideBar).toBeVisible()
  await expect(explorer).toHaveAttribute('aria-selected', 'true')

  // act
  await QuickPick.open()
  await expect(quickPick).toBeVisible()
  await QuickPick.handleInput(toggleSideBarCommand)
  await QuickPick.selectItem('Layout: Toggle Side Bar')

  // assert
  await expect(sideBar).toBeHidden()
  await expect(explorer).toHaveAttribute('aria-selected', 'false')
}
