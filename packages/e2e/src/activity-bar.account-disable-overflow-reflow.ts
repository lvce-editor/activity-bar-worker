import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account-disable-overflow-reflow'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const items = Locator('.ActivityBarItem')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.resize', {
    height: 288,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(items).toHaveCount(6)
  await expect(additionalViews).toBeVisible()

  await ActivityBar.setAccountEnabled(false)

  await expect(items).toHaveCount(6)
  await expect(additionalViews).toHaveCount(0)
  await expect(settings).toHaveClass('MarginTopAuto')
}
