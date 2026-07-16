import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.selected-item-overflow-recovery'

export const test: Test = async ({ Command, expect, Locator }) => {
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')

  await Command.execute('ActivityBar.handleSideBarStateChange', 'Extensions', true)
  await expect(extensions).toHaveAttribute('aria-selected', 'true')

  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(extensions).toHaveCount(0)
  await expect(additionalViews).toBeVisible()

  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(additionalViews).toHaveCount(0)
  await expect(extensions).toHaveAttribute('aria-selected', 'true')
}
