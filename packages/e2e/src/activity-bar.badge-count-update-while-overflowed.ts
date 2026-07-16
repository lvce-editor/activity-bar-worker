import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-update-while-overflowed'

export const test: Test = async ({ Command, expect, Locator }) => {
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')

  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })
  await expect(extensions).toHaveCount(0)

  await Command.execute('ActivityBar.handleBadgeCountChange', { Extensions: 23 })
  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(extensions).toBeVisible()
  await expect(extensions.locator('.ActivityBarItemBadge')).toHaveText('23')
}
