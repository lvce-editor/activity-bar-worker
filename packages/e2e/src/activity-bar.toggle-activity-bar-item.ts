import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-activity-bar-item'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  // assert - initial state
  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toBeVisible()
  await expect(search).toHaveClass('IconSearch')

  // act - toggle search off
  await ActivityBar.toggleActivityBarItem('Search')

  // assert - search is hidden
  await expect(search).toBeHidden()

  // act - toggle search on
  await ActivityBar.toggleActivityBarItem('Search')

  // assert - search is visible again
  await expect(search).toBeVisible()
  await expect(search).toHaveClass('IconSearch')
}
