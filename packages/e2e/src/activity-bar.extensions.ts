import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.extensions'

export const test: Test = async ({ expect, Locator }) => {
  // assert
  const explorer = Locator('.ActivityBarItem[title="Extensions"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconExtensions')
}
