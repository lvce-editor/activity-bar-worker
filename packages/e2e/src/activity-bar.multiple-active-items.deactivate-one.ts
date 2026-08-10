import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.multiple-active-items.deactivate-one'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  await Command.execute('ActivityBar.handleActiveViewStateChange', 'Search', true)

  await Command.execute('ActivityBar.handleActiveViewStateChange', 'Search', false)

  await expect(explorer).toHaveAttribute('aria-selected', 'true')
  await expect(search).toHaveAttribute('aria-selected', 'false')
}
