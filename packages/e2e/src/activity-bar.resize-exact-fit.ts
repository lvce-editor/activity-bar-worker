import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-exact-fit'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 48,
    x: 0,
    y: 0,
  })

  const account = Locator('.ActivityBarItem[title="Account"]')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await expect(items).toHaveCount(7)
  await expect(additionalViews).toHaveCount(0)
  await expect(account).toBeVisible()
  await expect(settings).toBeVisible()
}
