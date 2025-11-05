import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.update-in-progress'

export const test: Test = async ({ Locator, expect, Command }) => {
  // assert
  const activityBar = Locator('.ActivityBar')
  await expect(activityBar).toBeVisible()

  // act
  await Command.execute('ActivityBar.handleUpdateStateChange', {
    state: 1,
    progress: 0,
  })

  // assert
  const itemSettings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(itemSettings).toBeVisible()
  await expect(itemSettings).toHaveClass('MarginTopAuto')
  await expect(itemSettings).toHaveClass('ActivityBarItemNested')
  const badge = itemSettings.locator('.ActivityBarItemBadge')
  await expect(badge).toBeVisible()
  const progressIcon = badge.locator('.MaskIconProgress')
  await expect(progressIcon).toBeVisible()
}
