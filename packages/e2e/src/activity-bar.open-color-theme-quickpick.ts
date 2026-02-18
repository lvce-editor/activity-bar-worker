import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.open-color-theme-quickpick'

export const test: Test = async ({ Command, ContextMenu, expect, Locator, QuickPick }) => {
  // arrange
  await Command.execute('ActivityBar.handleClickSettings', 300, 300)
  const colorTheme = Locator('.MenuItem', { hasText: 'Color Theme' })
  await expect(colorTheme).toBeVisible()

  // act
  await ContextMenu.selectItem('Color Theme')

  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeVisible()
}
