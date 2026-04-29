import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-multiple-items'
export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  // assert - initial state
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')

  await expect(explorer).toBeVisible()
  await expect(search).toBeVisible()
  await expect(sourceControl).toBeVisible()

  // act - toggle explorer off
  await ActivityBar.toggleActivityBarItem('Explorer')

  // assert
  await expect(explorer).not.toBeVisible()
  await expect(search).toBeVisible()
  await expect(sourceControl).toBeVisible()

  // act - toggle search off
  await ActivityBar.toggleActivityBarItem('Search')

  // assert
  await expect(explorer).not.toBeVisible()
  await expect(search).not.toBeVisible()
  await expect(sourceControl).toBeVisible()

  // act - toggle explorer back on
  await ActivityBar.toggleActivityBarItem('Explorer')

  // assert
  await expect(explorer).toBeVisible()
  await expect(search).not.toBeVisible()
  await expect(sourceControl).toBeVisible()

  // act - toggle search back on
  await ActivityBar.toggleActivityBarItem('Search')

  // assert - all are visible again
  await expect(explorer).toBeVisible()
  await expect(search).toBeVisible()
  await expect(sourceControl).toBeVisible()
}
