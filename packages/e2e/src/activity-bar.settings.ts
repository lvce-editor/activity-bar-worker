import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings'

export const test: Test = async ({ expect, Locator }) => {
  // assert
  const explorer = Locator('.ActivityBarItem[title="Settings"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconSettingsGear')
}
