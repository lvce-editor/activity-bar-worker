import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-one-pixel-under-fit'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 335,
    width: 48,
    x: 0,
    y: 0,
  })

  const account = Locator('.ActivityBarItem[title="Account"]')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await expect(items).toHaveCount(6)
  await expect(additionalViews).toBeVisible()
  await expect(extensions).toHaveCount(0)
  await expect(account).toHaveCount(0)
  await expect(settings).toBeVisible()
}
