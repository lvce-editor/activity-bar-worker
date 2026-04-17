import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.context-menu.closes'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  await Command.execute('ActivityBar.handleClickSettings', 300, 300)

  await ContextMenu.selectItem('Settings')

  const menuItem = Locator('.ContextMenuItem[title="Settings"]')
  const tab = Locator('.MainTab[title="app://settings.json"]')

  await expect(tab).toBeVisible()
  await expect(menuItem).toHaveCount(0)
}
