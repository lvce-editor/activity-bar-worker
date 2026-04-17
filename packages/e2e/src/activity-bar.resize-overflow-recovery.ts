import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-overflow-recovery'

export const test: Test = async ({ Command, expect, Locator }) => {
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const search = Locator('.ActivityBarItem[title="Search"]')

  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(additionalViews).toBeVisible()

  await Command.execute('ActivityBar.resize', {
    height: 400,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(additionalViews).toHaveCount(0)
  await expect(search).toBeVisible()
}
