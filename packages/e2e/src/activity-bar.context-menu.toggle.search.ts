import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.search'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toBeVisible()

  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)

  const menuItem = Locator('.MenuItem', { hasText: 'Search' })
  await expect(menuItem).toBeVisible()
  await ContextMenu.selectItem('Search')

  await expect(search).toHaveCount(0)
}
