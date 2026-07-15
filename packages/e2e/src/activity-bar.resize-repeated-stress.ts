import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-repeated-stress'

export const test: Test = async ({ Command, expect, Locator }) => {
  for (let index = 0; index < 100; index++) {
    await Command.execute('ActivityBar.resize', {
      height: index % 2 === 0 ? 144 : 336,
      width: 48,
      x: index,
      y: index,
    })
  }

  const activityBar = Locator('.ActivityBar')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await expect(activityBar).toBeVisible()
  await expect(items).toHaveCount(7)
  await expect(additionalViews).toHaveCount(0)
  await expect(settings).toBeVisible()
}
