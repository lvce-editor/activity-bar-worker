import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.explorer'

export const skip = 1

export const test: Test = async ({ expect, Locator }) => {
  // assert
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconFiles')
}
