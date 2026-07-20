import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-last'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusLast')

  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(settings).toHaveClass('FocusOutline')
}
