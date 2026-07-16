import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.click-selected-clears-selection'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const selectedItems = Locator('.ActivityBarItem[aria-selected="true"]')

  await expect(explorer).toHaveAttribute('aria-selected', 'true')

  await Command.execute('ActivityBar.handleClickIndex', 0, 0, 0, 0)

  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(selectedItems).toHaveCount(0)
}
