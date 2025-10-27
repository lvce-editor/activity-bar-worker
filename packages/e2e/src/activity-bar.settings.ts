import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings'

export const test: Test = async ({ Locator, expect }) => {
  // assert
  const explorer = Locator('.ActivityBarItem[title="Settings"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconSettingsGear')
}
