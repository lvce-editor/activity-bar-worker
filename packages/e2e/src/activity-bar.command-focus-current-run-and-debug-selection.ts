import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-current-run-and-debug-selection'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Run And Debug', true)
  await Command.execute('ActivityBar.handleFocus')

  const runAndDebug = Locator('.ActivityBarItem[title="Run and Debug"]')
  await expect(runAndDebug).toHaveAttribute('aria-selected', 'true')
  await expect(runAndDebug).toHaveClass('FocusOutline')
}
