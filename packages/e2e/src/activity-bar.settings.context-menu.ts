import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.context-menu'

export const test: Test = async ({ expect, Locator }) => {
  // act - open settings context menu
  const settingsItem = Locator('.ActivityBarItem[title="Settings"]')
  await settingsItem.click({ button: 'left' })

  // assert - settings menu entry should be visible
  const settingsMenuItem = Locator('.ContextMenuItem[title="Settings"]')
  await expect(settingsMenuItem).toBeVisible()

  // act - click settings menu entry
  await settingsMenuItem.click({ button: 'left' })

  // assert - settings view should open
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')
  await expect(sideBarHeaderTitle).toHaveText('Settings')
}
