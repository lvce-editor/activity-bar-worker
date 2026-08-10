import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.multiple-active-items.sidebar-switch'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await Command.execute('ActivityBar.handleActiveViewStateChange', 'Source Control', true)

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Search', true)

  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(search).toHaveAttribute('aria-selected', 'true')
  await expect(sourceControl).toHaveAttribute('aria-selected', 'true')
}
