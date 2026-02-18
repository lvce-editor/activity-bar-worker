import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.context-menu.command-palette'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  // arrange
  await Command.execute('ActivityBar.handleClickSettings', 300, 300)
  const colorTheme = Locator('.MenuItem', { hasText: 'Command Palette' })
  await expect(colorTheme).toBeVisible()

  // act
  await ContextMenu.selectItem('Command Palette')

  // assert
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeVisible()
}
