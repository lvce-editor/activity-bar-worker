import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-repeated-stress'

export const test: Test = async ({ Command, expect, Locator }) => {
  const activityBar = Locator('.ActivityBar')

  for (let count = 1; count <= 200; count++) {
    await Command.execute('ActivityBar.handleBadgeCountChange', {
      'Source Control': count,
    })
  }

  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(sourceControl.locator('.ActivityBarItemBadge')).toHaveText('200')
  await expect(sourceControl).toHaveAttribute('role', 'tab')
  await expect(activityBar).toBeVisible()
}
