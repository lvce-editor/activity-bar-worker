import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.sidebar-selection-clears-focus'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toHaveClass('FocusOutline')

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Search', true)

  const search = Locator('.ActivityBarItem[title="Search"]')
  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  const selectedItems = Locator('.ActivityBarItemSelected')
  await expect(search).toHaveAttribute('aria-selected', 'true')
  await expect(selectedItems).toHaveCount(1)
  await expect(focusedItems).toHaveCount(0)
}
