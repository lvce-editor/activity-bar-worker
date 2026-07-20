import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-hidden-clears-focus'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Explorer', false)

  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  await expect(focusedItems).toHaveCount(0)
}
