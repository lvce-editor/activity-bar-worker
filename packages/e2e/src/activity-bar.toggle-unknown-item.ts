import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-unknown-item'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await Command.execute('ActivityBar.toggleActivityBarItem', 'Unknown Activity Bar Item')

  await expect(items).toHaveCount(7)
  await expect(explorer).toHaveAttribute('aria-selected', 'true')
  await expect(settings).toBeVisible()
}
