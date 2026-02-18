import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.context-menu.command-palette'

export const test: Test = async ({ expect, Locator }) => {
  // act - open settings context menu
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await settings.click({ button: 'left' })

  // act - open command palette from settings context menu
  const commandPalette = Locator('.ContextMenuItem[title="Command Palette"]')
  await expect(commandPalette).toBeVisible()
  await commandPalette.click({ button: 'left' })

  // assert - quick pick should be visible
  const quickPick = Locator('.QuickPick')
  await expect(quickPick).toBeVisible()
}
