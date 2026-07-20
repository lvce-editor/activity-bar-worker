import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-source-control-item'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await ActivityBar.toggleActivityBarItem('Source Control')
  await expect(sourceControl).toHaveCount(0)

  await ActivityBar.toggleActivityBarItem('Source Control')
  await expect(sourceControl).toBeVisible()
}
