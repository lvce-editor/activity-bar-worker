import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.focus-outline-clears-on-item-click'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toHaveClass('FocusOutline')

  const search = Locator('.ActivityBarItem[title="Search"]')
  // Exercise the browser focus transition caused by an actual pointer click.
  // eslint-disable-next-line e2e/no-direct-click
  await search.click()

  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  await expect(focusedItems).toHaveCount(0)
}
