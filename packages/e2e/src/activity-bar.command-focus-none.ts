import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-none'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusNone')

  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  await expect(focusedItems).toHaveCount(0)
}
