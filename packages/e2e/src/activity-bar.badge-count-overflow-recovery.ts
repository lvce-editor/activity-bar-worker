import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-overflow-recovery'

export const test: Test = async ({ Command, expect, Locator }) => {
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  const badge = extensions.locator('.ActivityBarItemBadge')

  await Command.execute('ActivityBar.handleBadgeCountChange', { Extensions: 17 })
  await expect(badge).toHaveText('17')

  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })
  await expect(extensions).toHaveCount(0)

  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 48,
    x: 0,
    y: 0,
  })
  await expect(badge).toHaveText('17')
}
