import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-current-extensions-selection'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Extensions', true)
  await Command.execute('ActivityBar.handleFocus')

  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  await expect(extensions).toHaveAttribute('aria-selected', 'true')
  await expect(extensions).toHaveClass('FocusOutline')
}
