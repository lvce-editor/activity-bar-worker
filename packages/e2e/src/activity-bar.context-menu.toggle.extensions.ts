import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.extensions'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(extensions).toBeVisible()
  await expect(settings).toHaveCount(1)

  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)

  const menuItem = Locator('.MenuItem', { hasText: 'Extensions' })
  await expect(menuItem).toBeVisible()
  await ContextMenu.selectItem('Extensions')

  await expect(extensions).toHaveCount(0)
  await expect(settings).toHaveCount(1)
}
