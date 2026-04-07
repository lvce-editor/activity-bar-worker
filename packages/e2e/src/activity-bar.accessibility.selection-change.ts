import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.accessibility.selection-change'

export const test: Test = async ({ expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')

  await expect(explorer).toHaveAttribute('aria-selected', 'true')
  await expect(search).toHaveAttribute('aria-selected', 'false')

  await search.click({ button: 'left' })

  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(search).toHaveAttribute('aria-selected', 'true')
}
