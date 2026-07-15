import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.badge-count-max-safe-integer'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleBadgeCountChange', {
    'Source Control': Number.MAX_SAFE_INTEGER,
  })

  const badge = Locator('.ActivityBarItem[title="Source Control"]').locator('.ActivityBarItemBadge')
  await expect(badge).toHaveText('9007199254740991')
}
