import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-next-twice'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusNext')
  await Command.execute('ActivityBar.focusNext')

  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(sourceControl).toHaveClass('FocusOutline')
}
