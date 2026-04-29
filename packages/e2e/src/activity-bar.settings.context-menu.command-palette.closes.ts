import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.context-menu.command-palette.closes'

export const test: Test = async ({ ActivityBar, ContextMenu, expect, Locator }) => {
  await ActivityBar.handleClickSettings(300, 300)

  await ContextMenu.selectItem('Command Palette')

  const menuItem = Locator('.ContextMenuItem[title="Command Palette"]')
  const quickPick = Locator('.QuickPick')

  await expect(quickPick).toBeVisible()
  await expect(menuItem).toHaveCount(0)
}
