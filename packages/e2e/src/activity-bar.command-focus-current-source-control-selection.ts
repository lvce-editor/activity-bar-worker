import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-current-source-control-selection'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Source Control', true)
  await Command.execute('ActivityBar.handleFocus')

  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(sourceControl).toHaveAttribute('aria-selected', 'true')
  await expect(sourceControl).toHaveClass('FocusOutline')
}
