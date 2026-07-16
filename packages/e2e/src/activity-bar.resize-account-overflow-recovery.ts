import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-account-overflow-recovery'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const account = Locator('.ActivityBarItem[title="Account"]')
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')

  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.resize', {
    height: 192,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(account).toHaveCount(0)
  await expect(additionalViews).toBeVisible()
  await expect(settings).toBeVisible()

  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(additionalViews).toHaveCount(0)
  await expect(account).toBeVisible()
  await expect(account).toHaveClass('MarginTopAuto')
  await expect(settings).toBeVisible()
}
