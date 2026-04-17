import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.focus'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  await ActivityBar.focus()

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')

  await expect(explorer).toHaveClass('FocusOutline')
}
