import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.search'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toBeVisible()

  await ActivityBar.handleContextMenu()

  const menuItem = Locator('.ContextMenuItem[title="Search"]')
  await expect(menuItem).toBeVisible()
  await menuItem.click({ button: 'left' })

  await expect(search).toHaveCount(0)
}
