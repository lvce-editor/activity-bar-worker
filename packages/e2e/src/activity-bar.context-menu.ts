import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  // act
  await ActivityBar.handleContextMenu()

  // assert
  const explorer = Locator('.ActivityBarItem[title="Search"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconSearch')
}
