import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-activity-bar-item'

export const test: Test = async ({ Command, expect, Locator }) => {
  // assert - initial state
  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toBeVisible()
  await expect(search).toHaveClass('IconSearch')

  // act - toggle search off
  await Command.execute('ActivityBar.toggleActivityBarItem', 'Search')

  // assert - search is hidden
  await expect(search).not.toBeVisible()

  // act - toggle search on
  await Command.execute('ActivityBar.toggleActivityBarItem', 'Search')

  // assert - search is visible again
  await expect(search).toBeVisible()
  await expect(search).toHaveClass('IconSearch')
}
