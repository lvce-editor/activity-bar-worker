import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-select-current-search'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusNext')
  await Command.execute('ActivityBar.selectCurrent')

  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toHaveAttribute('aria-selected', 'true')
}
