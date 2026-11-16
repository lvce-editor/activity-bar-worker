import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-previous-skips-disabled-search'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.toggleActivityBarItem('Search')
  await Command.execute('ActivityBar.focusIndex', 1)
  await ActivityBar.focusPrevious()

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toHaveCount(0)
  await expect(explorer).toHaveClass('FocusOutline')
}
