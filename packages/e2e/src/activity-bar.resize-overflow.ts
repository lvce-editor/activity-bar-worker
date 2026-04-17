import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-overflow'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await expect(explorer).toBeVisible()
  await expect(search).toHaveCount(0)
  await expect(additionalViews).toBeVisible()
  await expect(settings).toBeVisible()
}
