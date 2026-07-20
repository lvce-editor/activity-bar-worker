import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-extensions-item'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  await ActivityBar.toggleActivityBarItem('Extensions')
  await expect(extensions).toHaveCount(0)

  await ActivityBar.toggleActivityBarItem('Extensions')
  await expect(extensions).toBeVisible()
}
