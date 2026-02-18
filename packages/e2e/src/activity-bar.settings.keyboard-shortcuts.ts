import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings.keyboard-shortcuts'

export const test: Test = async ({ ActivityBar, ContextMenu, expect, Locator }) => {
  // act
  await ActivityBar.handleContextMenu()
  await ContextMenu.selectItem('Keyboard Shortcuts')

  // assert
  const keyBindingsView = Locator('.KeyBindings')
  await expect(keyBindingsView).toBeVisible()
}
