import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.move-side-bar-left-right'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  const moveSideBarLeft = Locator('.MenuItem', {
    hasText: 'Move Side Bar Left',
  })
  const moveSideBarRight = Locator('.MenuItem', {
    hasText: 'Move Side Bar Right',
  })

  // arrange
  await Command.execute('Layout.moveSideBarRight')
  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarLeft).toBeVisible()

  // act
  await ContextMenu.selectItem('Move Side Bar Left')

  // assert
  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarRight).toBeVisible()

  await ContextMenu.selectItem('Move Side Bar Right')

  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarLeft).toBeVisible()
}
