import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-unknown-item'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const items = Locator('.ActivityBarItem')
  const unknownItem = Locator('.ActivityBarItem[title="Unknown Activity Bar Item"]')

  await Command.execute('ActivityBar.handleBadgeCountChange', {
    'Unknown Activity Bar Item': 9,
  })

  await expect(items).toHaveCount(7)
  await expect(unknownItem).toHaveCount(0)
  await expect(explorer).toBeVisible()
}
