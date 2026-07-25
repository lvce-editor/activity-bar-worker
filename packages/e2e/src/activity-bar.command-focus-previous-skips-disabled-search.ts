import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-previous-skips-disabled-search'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.toggleActivityBarItem', 'Search')
  await Command.execute('ActivityBar.focusIndex', 1)
  await Command.execute('ActivityBar.focusPrevious')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toHaveCount(0)
  await expect(explorer).toHaveClass('FocusOutline')
}
