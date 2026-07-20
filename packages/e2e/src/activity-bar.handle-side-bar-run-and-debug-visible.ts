import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-run-and-debug-visible'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Run And Debug', true)

  const runAndDebug = Locator('.ActivityBarItem[title="Run and Debug"]')
  await expect(runAndDebug).toHaveAttribute('aria-selected', 'true')
}
