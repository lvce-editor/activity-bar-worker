import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.references-hidden-by-default'

export const test: Test = async ({ expect, Locator }) => {
  const references = Locator('.ActivityBarItem[title="References"]')

  await expect(references).toHaveCount(0)
}
