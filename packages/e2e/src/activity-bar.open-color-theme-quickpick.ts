import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.open-color-theme-quickpick'

export const test: Test = async ({ ActivityBar, ContextMenu, expect, Locator }) => {
  // arrange
  await ActivityBar.handleClickSettings(300, 300)
  const colorTheme = Locator('.MenuItem', { hasText: 'Color Theme' })
  await expect(colorTheme).toBeVisible()

  // act
  await ContextMenu.selectItem('Color Theme')

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeVisible()
}
