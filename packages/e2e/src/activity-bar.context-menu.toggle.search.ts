import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = ['webkit']

export const name = 'activity-bar.context-menu.toggle.search'

export const test: Test = async ({ ActivityBar, ContextMenu, expect, Locator }) => {
  const search = Locator('.ActivityBarItem[title="Search"]')
  await expect(search).toBeVisible()

  await ActivityBar.handleContextMenu(300, 300, 0, 0)

  const menuItem = Locator('.MenuItem', { hasText: 'Search' })
  await expect(menuItem).toBeVisible()
  await ContextMenu.selectItem('Search')

  await expect(search).toHaveCount(0)
}
