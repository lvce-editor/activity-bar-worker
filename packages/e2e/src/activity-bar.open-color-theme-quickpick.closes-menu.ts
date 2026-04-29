import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.open-color-theme-quickpick.closes-menu'

export const test: Test = async ({ ActivityBar, ContextMenu, expect, Locator }) => {
  await ActivityBar.handleClickSettings(300, 300)

  await ContextMenu.selectItem('Color Theme')

  const colorTheme = Locator('.ContextMenuItem[title="Color Theme"]')
  const quickPick = Locator('.QuickPick')

  await expect(quickPick).toBeVisible()
  await expect(colorTheme).toHaveCount(0)
}
