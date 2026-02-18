import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.context-menu'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  // arrange
  await Command.execute('ActivityBar.handleClickSettings', 300, 300)

  // act
  await ContextMenu.selectItem('Command Palette')

  // assert
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')
  await expect(sideBarHeaderTitle).toHaveText('Settings')
}
