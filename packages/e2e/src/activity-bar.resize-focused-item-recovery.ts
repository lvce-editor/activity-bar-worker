import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-focused-item-recovery'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.focusIndex', 4)

  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  await expect(extensions).toHaveClass('FocusOutline')

  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })

  const focusedItems = Locator('.ActivityBarItem.FocusOutline')
  await expect(extensions).toHaveCount(0)
  await expect(focusedItems).toHaveCount(0)

  await Command.execute('ActivityBar.resize', {
    height: 336,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(extensions).toHaveClass('FocusOutline')
  await expect(focusedItems).toHaveCount(1)
}
