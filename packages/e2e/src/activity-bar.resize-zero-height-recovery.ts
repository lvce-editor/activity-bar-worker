import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-zero-height-recovery'

export const test: Test = async ({ Command, expect, Locator }) => {
  const activityBar = Locator('.ActivityBar')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await Command.execute('ActivityBar.resize', {
    height: 0,
    width: 48,
    x: 0,
    y: 0,
  })
  await expect(activityBar).toBeVisible()
  await expect(settings).toBeVisible()

  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 48,
    x: 0,
    y: 0,
  })
  await expect(items).toHaveCount(7)
  await expect(additionalViews).toHaveCount(0)
}
