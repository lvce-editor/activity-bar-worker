import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.context-menu'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  // arrange
  await Command.execute('ActivityBar.handleClickSettings', 300, 300)

  // act
  await ContextMenu.selectItem('Settings')

  // assert
  const tab = Locator('.MainTab[title="app://settings.json"]')
  await expect(tab).toBeVisible()
}
