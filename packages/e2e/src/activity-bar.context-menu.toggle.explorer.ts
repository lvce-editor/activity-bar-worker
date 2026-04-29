import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.explorer'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toBeVisible()

  await ActivityBar.handleContextMenu()

  const menuItem = Locator('.ContextMenuItem[title="Explorer"]')
  await expect(menuItem).toBeVisible()
  await menuItem.click({ button: 'left' })

  await expect(explorer).toHaveCount(0)
}
