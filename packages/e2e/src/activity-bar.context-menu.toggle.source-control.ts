import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.source-control'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(sourceControl).toBeVisible()

  await ActivityBar.handleContextMenu()

  const menuItem = Locator('.ContextMenuItem[title="Source Control"]')
  await expect(menuItem).toBeVisible()
  await menuItem.click({ button: 'left' })

  await expect(sourceControl).toHaveCount(0)
}
