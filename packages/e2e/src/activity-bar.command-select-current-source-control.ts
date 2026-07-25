import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-select-current-source-control'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusIndex', 2)
  await Command.execute('ActivityBar.selectCurrent')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(sourceControl).toHaveAttribute('aria-selected', 'true')
}
