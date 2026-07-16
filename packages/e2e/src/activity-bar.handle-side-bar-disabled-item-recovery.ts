import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-disabled-item-recovery'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const search = Locator('.ActivityBarItem[title="Search"]')

  await ActivityBar.toggleActivityBarItem('Search')
  await expect(search).toHaveCount(0)

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Search', true)
  await ActivityBar.toggleActivityBarItem('Search')

  await expect(search).toBeVisible()
  await expect(search).toHaveAttribute('aria-selected', 'true')
}
