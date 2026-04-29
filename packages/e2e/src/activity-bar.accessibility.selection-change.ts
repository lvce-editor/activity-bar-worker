import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.accessibility.selection-change'

export const test: Test = async ({ ActivityBar, Command, expect, Layout, Locator, SideBar }) => {
  // arrange
  await Layout.showSideBar()
  await SideBar.hide()

  // act
  await Command.execute('ActivityBar.handleClickIndex', 0, 1, 0, 0)
  await ActivityBar.handleClick(1)

  // assert
  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toHaveAttribute('aria-selected', 'true')
}
