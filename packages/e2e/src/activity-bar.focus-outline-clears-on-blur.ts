import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.focus-outline-clears-on-blur'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toHaveClass('FocusOutline')

  await Command.execute('ActivityBar.handleBlur')

  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  await expect(focusedItems).toHaveCount(0)
}
