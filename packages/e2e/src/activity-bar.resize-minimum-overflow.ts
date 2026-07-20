import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-minimum-overflow'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 96,
    width: 48,
    x: 0,
    y: 0,
  })

  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(items).toHaveCount(2)
  await expect(additionalViews).toBeVisible()
  await expect(settings).toBeVisible()
}
