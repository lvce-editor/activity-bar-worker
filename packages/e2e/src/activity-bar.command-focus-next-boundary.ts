import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-next-boundary'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusLast')
  await Command.execute('ActivityBar.focusNext')

  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(focusedItems).toHaveCount(1)
  await expect(settings).toHaveClass('FocusOutline')
}
