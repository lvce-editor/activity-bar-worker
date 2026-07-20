import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-after-hidden-side-bar'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Explorer', false)
  await Command.execute('ActivityBar.handleFocus')

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toHaveClass('FocusOutline')
}
