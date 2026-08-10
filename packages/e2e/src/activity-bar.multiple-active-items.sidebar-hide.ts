import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.multiple-active-items.sidebar-hide'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  await Command.execute('ActivityBar.handleActiveViewStateChange', 'Search', true)

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Explorer', false)

  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(search).toHaveAttribute('aria-selected', 'true')
}
