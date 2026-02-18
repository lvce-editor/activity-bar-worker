import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.open-color-theme-quickpick'

export const test: Test = async ({ ActivityBar, Command, ContextMenu, expect, Locator, QuickPick }) => {
  // arrange
  await Command.execute('ActivityBar.handleClickSettings')
  const colorTheme = Locator('.ContextMenuItem[title="Color Theme"]')
  await expect(colorTheme).toBeVisible()

  // act
  await ContextMenu.selectItem('Color Theme')

  // TODO verify quickpick is visible
}
