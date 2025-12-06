import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.source-control'

export const test: Test = async ({ expect, Locator }) => {
  // assert
  const explorer = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconSourceControl')
}
