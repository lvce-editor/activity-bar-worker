import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-handle-focus-current'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toHaveClass('FocusOutline')
}
