import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.keyboard-shortcuts.closes'

export const test: Test = async ({ ActivityBar, ContextMenu, expect, Locator }) => {
  await ActivityBar.handleClickSettings(300, 300)

  await ContextMenu.selectItem('Keyboard Shortcuts')

  const menuItem = Locator('.ContextMenuItem[title="Keyboard Shortcuts"]')
  const tab = Locator('.MainTab[title="app://keybindings"]')

  await expect(tab).toBeVisible()
  await expect(menuItem).toHaveCount(0)
}
