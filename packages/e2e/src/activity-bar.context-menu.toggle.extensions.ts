import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.extensions'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  await expect(extensions).toBeVisible()

  await ActivityBar.handleContextMenu()

  const menuItem = Locator('.ContextMenuItem[title="Extensions"]')
  await expect(menuItem).toBeVisible()
  await menuItem.click({ button: 'left' })

  await expect(extensions).toHaveCount(0)
}
