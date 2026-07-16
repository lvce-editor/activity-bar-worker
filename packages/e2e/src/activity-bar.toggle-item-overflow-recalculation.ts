import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-item-overflow-recalculation'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const account = Locator('.ActivityBarItem[title="Account"]')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  const items = Locator('.ActivityBarItem')
  const search = Locator('.ActivityBarItem[title="Search"]')

  await Command.execute('ActivityBar.resize', {
    height: 288,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(items).toHaveCount(6)
  await expect(search).toBeVisible()
  await expect(extensions).toHaveCount(0)
  await expect(account).toHaveCount(0)
  await expect(additionalViews).toBeVisible()

  await ActivityBar.toggleActivityBarItem('Search')

  await expect(items).toHaveCount(6)
  await expect(search).toHaveCount(0)
  await expect(extensions).toBeVisible()
  await expect(account).toBeVisible()
  await expect(additionalViews).toHaveCount(0)

  await ActivityBar.toggleActivityBarItem('Search')

  await expect(items).toHaveCount(6)
  await expect(search).toBeVisible()
  await expect(extensions).toHaveCount(0)
  await expect(account).toHaveCount(0)
  await expect(additionalViews).toBeVisible()
}
