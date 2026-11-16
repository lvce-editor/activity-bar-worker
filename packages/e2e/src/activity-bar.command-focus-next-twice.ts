import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-next-twice'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await ActivityBar.focusNext()
  await ActivityBar.focusNext()

  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(sourceControl).toHaveClass('FocusOutline')
}
