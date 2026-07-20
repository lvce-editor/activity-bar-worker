import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-previous'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusNext')
  await Command.execute('ActivityBar.focusPrevious')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toHaveClass('FocusOutline')
}
