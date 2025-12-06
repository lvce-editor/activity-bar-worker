import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.run-and-debug'

export const test: Test = async ({ expect, Locator }) => {
  // assert
  const explorer = Locator('.ActivityBarItem[title="Run and Debug"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconDebugAlt2')
}
