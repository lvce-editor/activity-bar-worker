import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.source-control'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(sourceControl).toBeVisible()

  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)

  const menuItem = Locator('.MenuItem', { hasText: 'Source Control' })
  await expect(menuItem).toBeVisible()
  await ContextMenu.selectItem('Source Control')

  await expect(sourceControl).toHaveCount(0)
}
