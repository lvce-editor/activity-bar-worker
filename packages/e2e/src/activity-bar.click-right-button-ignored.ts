import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.click-right-button-ignored'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')

  await Command.execute('ActivityBar.handleClickIndex', 2, 1, 0, 0)

  await expect(explorer).toHaveAttribute('aria-selected', 'true')
  await expect(search).toHaveAttribute('aria-selected', 'false')
}
