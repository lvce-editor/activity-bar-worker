import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.update-in-finished'

export const test: Test = async ({ Locator, expect, Command }) => {
  // assert
  const activityBar = Locator('.ActivityBar')
  await expect(activityBar).toBeVisible()

  // act
  await Command.execute('ActivityBar.handleUpdateStateChange', {
    state: 4,
    progress: 1,
  })

  // assert
  const itemSettings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(itemSettings).toBeVisible()
  await expect(itemSettings).toHaveClass('MarginTopAuto')
  await expect(itemSettings).toHaveClass('ActivityBarItemNested')
  const badge = itemSettings.locator('.ActivityBarItemBadge')
  await expect(badge).toBeVisible()
  await expect(badge).toHaveText('1')
}
