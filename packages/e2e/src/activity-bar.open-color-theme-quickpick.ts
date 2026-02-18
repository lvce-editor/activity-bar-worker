import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.open-color-theme-quickpick'

export const test: Test = async ({ ContextMenu, expect, Locator, QuickPick }) => {
  // act - open settings context menu
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await settings.click({ button: 'left' })

  // assert - color theme entry should be available
  const colorTheme = Locator('.ContextMenuItem[title="Color Theme"]')
  await expect(colorTheme).toBeVisible()

  // act - open color theme quick pick
  await ContextMenu.selectItem('Color Theme')

  // assert - quick pick is open and can be interacted with
  await QuickPick.focusFirst()
}
