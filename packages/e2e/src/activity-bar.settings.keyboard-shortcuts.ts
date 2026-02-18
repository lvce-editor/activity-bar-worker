import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.keyboard-shortcuts'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  // arrange
  await Command.execute('ActivityBar.handleClickSettings', 300, 300)

  // act
  await ContextMenu.selectItem('Keyboard Shortcuts')

  // assert
  const tab = Locator('.MainTab[title="app://keybindings"]')
  await expect(tab).toBeVisible()
}
