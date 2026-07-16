import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account-enable-overflow-reflow'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const account = Locator('.ActivityBarItem[title="Account"]')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const items = Locator('.ActivityBarItem')

  await ActivityBar.setAccountEnabled(false)
  await Command.execute('ActivityBar.resize', {
    height: 288,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(items).toHaveCount(6)
  await expect(account).toHaveCount(0)
  await expect(additionalViews).toHaveCount(0)

  await ActivityBar.setAccountEnabled(true)

  await expect(items).toHaveCount(6)
  await expect(account).toHaveCount(0)
  await expect(additionalViews).toBeVisible()
}
