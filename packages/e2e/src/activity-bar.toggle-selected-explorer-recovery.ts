import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-selected-explorer-recovery'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toHaveAttribute('aria-selected', 'true')

  await Command.execute('ActivityBar.toggleActivityBarItem', 'Explorer')
  await expect(explorer).toHaveCount(0)

  await Command.execute('ActivityBar.toggleActivityBarItem', 'Explorer')
  await expect(explorer).toHaveAttribute('aria-selected', 'true')
}
