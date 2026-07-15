import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.running-extensions'

export const test: Test = async ({ expect, Locator }) => {
  const runningExtensions = Locator('.ActivityBarItem[title="Running Extensions"]')
  await expect(runningExtensions).toHaveCount(0)
}
