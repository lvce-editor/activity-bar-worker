import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.update-downloaded-waiting-for-restart'

export const test: Test = async ({ Command, expect, Locator }) => {
  // assert
  const activityBar = Locator('.ActivityBar')
  await expect(activityBar).toBeVisible()

  // act
  await Command.execute('ActivityBar.handleUpdateStateChange', {
    progress: 0,
    state: 4,
  })

  // assert
  const itemSettings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(itemSettings).toBeVisible()
  await expect(itemSettings).toHaveClass('MarginTopAuto')
  await expect(itemSettings).toHaveClass('ActivityBarItemNested')
  const badge = itemSettings.locator('.ActivityBarItemBadge')
  await expect(badge).toBeVisible()
}
