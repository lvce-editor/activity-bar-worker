import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-hidden'

export const skip = 1

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')

  await expect(explorer).toHaveAttribute('aria-selected', 'true')

  await Command.execute('ActivityBar.handleSideBarHidden')

  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(search).toHaveAttribute('aria-selected', 'false')
  await expect(sourceControl).toHaveAttribute('aria-selected', 'false')
}
