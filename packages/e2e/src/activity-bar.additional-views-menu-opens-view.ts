import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.additional-views-menu-opens-view'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })
  await Command.execute('ActivityBar.handleClickAdditionalViews', 300, 300)

  await ContextMenu.selectItem('Search')

  const sideBarTitle = Locator('.SideBarTitleAreaTitle')
  await expect(sideBarTitle).toHaveText('Search')
}
