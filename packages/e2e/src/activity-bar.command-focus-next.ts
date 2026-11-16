import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-next'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await ActivityBar.focusNext()

  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toHaveClass('FocusOutline')
}
