import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-previous'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await ActivityBar.focusNext()
  await ActivityBar.focusPrevious()

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toHaveClass('FocusOutline')
}
