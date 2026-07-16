import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-unknown-view'

export const test: Test = async ({ Command, expect, Locator }) => {
  const activityBar = Locator('.ActivityBar')
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const items = Locator('.ActivityBarItem')
  const selectedItems = Locator('.ActivityBarItem[aria-selected="true"]')

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Unknown View', true)

  await expect(activityBar).toBeVisible()
  await expect(items).toHaveCount(7)
  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(selectedItems).toHaveCount(0)
}
