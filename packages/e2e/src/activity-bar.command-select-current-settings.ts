import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-select-current-settings'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusLast')
  await ActivityBar.selectCurrent()

  const commandPalette = Locator('.MenuItem', { hasText: 'Command Palette' })
  await expect(commandPalette).toBeVisible()
}
