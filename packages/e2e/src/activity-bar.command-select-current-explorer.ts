import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-select-current-explorer'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.selectCurrent')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(focusedItems).toHaveCount(0)
}
