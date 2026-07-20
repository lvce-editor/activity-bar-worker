import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-previous-boundary'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusFirst')
  await Command.execute('ActivityBar.focusPrevious')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  await expect(focusedItems).toHaveCount(1)
  await expect(explorer).toHaveClass('FocusOutline')
}
