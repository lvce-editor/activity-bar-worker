import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-next-skips-disabled-search'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.toggleActivityBarItem', 'Search')
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusNext')

  const search = Locator('.ActivityBarItem[title="Search"]')
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(search).toHaveCount(0)
  await expect(sourceControl).toHaveClass('FocusOutline')
}
