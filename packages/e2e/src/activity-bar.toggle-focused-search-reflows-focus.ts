import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-focused-search-reflows-focus'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await ActivityBar.focusNext()
  await ActivityBar.toggleActivityBarItem('Search')

  const search = Locator('.ActivityBarItem[title="Search"]')
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(search).toHaveCount(0)
  await expect(sourceControl).toHaveClass('FocusOutline')
}
