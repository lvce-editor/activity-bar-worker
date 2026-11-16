import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = ['webkit']

export const name = 'activity-bar.context-menu.toggle.explorer'

export const test: Test = async ({ ActivityBar, ContextMenu, expect, Locator }) => {
  // arrange
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toBeVisible()
  await ActivityBar.handleContextMenu(300, 300, 0, 0)
  const menuItem = Locator('.MenuItem', { hasText: `Explorer` })
  await expect(menuItem).toBeVisible()

  // act
  await ContextMenu.selectItem(`Explorer`)

  // assert
  // TODO
  // await expect(explorer).toHaveCount(0)
}
