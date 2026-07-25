import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-select-current-extensions'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusIndex', 4)
  await Command.execute('ActivityBar.selectCurrent')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(extensions).toHaveAttribute('aria-selected', 'true')
}
