import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.search'

export const test: Test = async ({ Locator, expect }) => {
  // assert
  const explorer = Locator('.ActivityBarItem[title="Search"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconSearch')
}
