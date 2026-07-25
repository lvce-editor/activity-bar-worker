import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-index-source-control'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.focusIndex', 2)

  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  await expect(sourceControl).toHaveClass('FocusOutline')
  await expect(focusedItems).toHaveCount(1)
}
