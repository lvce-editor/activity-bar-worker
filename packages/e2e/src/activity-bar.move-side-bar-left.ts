import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.move-side-bar-left'

// TODO add move right test
export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  // arrange
  await Command.execute('Layout.moveSideBarRight')
  await Command.execute('ActivityBar.handleContextMenu', 0, 0, 0)
  const moveSideBarLeft = Locator('.MenuItem', {
    hasText: 'Move Side Bar Left',
  })
  await expect(moveSideBarLeft).toBeVisible()

  // act
  await ContextMenu.selectItem('Move Side Bar Left')

  // assert
  // await Command.execute('ActivityBar.handleContextMenu', 0, 0, 0)
  // const moveSideBarRight = Locator('.ContextMenuItem[title="Move Side Bar Right"]')
  // await expect(moveSideBarRight).toBeVisible()
}
