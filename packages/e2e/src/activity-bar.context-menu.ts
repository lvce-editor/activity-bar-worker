import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  // act
  await ActivityBar.handleContextMenu()

  // assert
  const explorer = Locator('.ContextMenuItem[title="Explorer"]')
  const search = Locator('.ContextMenuItem[title="Search"]')
  const moveSideBarRight = Locator('.ContextMenuItem[title="Move Side Bar Right"]')
  const moveSideBarLeft = Locator('.ContextMenuItem[title="Move Side Bar Left"]')
  const hideActivityBar = Locator('.ContextMenuItem[title="Hide Activity Bar"]')

  await expect(explorer).toBeVisible()
  await expect(search).toBeVisible()
  await expect(moveSideBarRight).toBeVisible()
  await expect(moveSideBarLeft).toHaveCount(0)
  await expect(hideActivityBar).toBeVisible()
}
