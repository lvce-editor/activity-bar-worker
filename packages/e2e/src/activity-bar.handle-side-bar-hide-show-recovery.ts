import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-hide-show-recovery'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const selectedItems = Locator('.ActivityBarItem[aria-selected="true"]')

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Explorer', false)
  await expect(selectedItems).toHaveCount(0)

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Explorer', true)

  await expect(explorer).toHaveAttribute('aria-selected', 'true')
  await expect(selectedItems).toHaveCount(1)
}
