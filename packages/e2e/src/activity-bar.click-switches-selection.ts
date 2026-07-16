import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.click-switches-selection'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  const search = Locator('.ActivityBarItem[title="Search"]')

  await Command.execute('ActivityBar.handleClickIndex', 0, 1, 0, 0)

  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(search).toHaveAttribute('aria-selected', 'true')

  await Command.execute('ActivityBar.handleClickIndex', 0, 4, 0, 0)

  await expect(search).toHaveAttribute('aria-selected', 'false')
  await expect(extensions).toHaveAttribute('aria-selected', 'true')
}
