import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-current-search-selection'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Search', true)
  await Command.execute('ActivityBar.handleFocus')

  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toHaveAttribute('aria-selected', 'true')
  await expect(search).toHaveClass('FocusOutline')
}
