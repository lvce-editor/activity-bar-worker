import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-settings-item'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await ActivityBar.toggleActivityBarItem('Settings')
  await expect(settings).toHaveCount(0)

  await ActivityBar.toggleActivityBarItem('Settings')
  await expect(settings).toBeVisible()
}
