import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-zero-width-recovery'

export const test: Test = async ({ Command, expect, Locator }) => {
  const activityBar = Locator('.ActivityBar')
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 0,
    x: 0,
    y: 0,
  })

  await expect(activityBar).toBeVisible()
  await expect(items).toHaveCount(7)

  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(explorer).toBeVisible()
  await expect(settings).toBeVisible()
}
