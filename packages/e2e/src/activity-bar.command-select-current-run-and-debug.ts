import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-select-current-run-and-debug'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusIndex', 3)
  await Command.execute('ActivityBar.selectCurrent')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const runAndDebug = Locator('.ActivityBarItem[title="Run and Debug"]')
  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(runAndDebug).toHaveAttribute('aria-selected', 'true')
}
