import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-run-and-debug-item'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const runAndDebug = Locator('.ActivityBarItem[title="Run and Debug"]')
  await ActivityBar.toggleActivityBarItem('Run And Debug')
  await expect(runAndDebug).toHaveCount(0)

  await ActivityBar.toggleActivityBarItem('Run And Debug')
  await expect(runAndDebug).toBeVisible()
}
