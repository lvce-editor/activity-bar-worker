import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.move-side-bar-left'

export const skip = 1

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  // arrange
  await Command.execute('Layout.moveSideBarRight')

  // act
  await ActivityBar.handleContextMenu()

  // assert
  const moveSideBarLeft = Locator('.ContextMenuItem[title="Move Side Bar Left"]')
  await expect(moveSideBarLeft).toBeVisible()

  // act
  await moveSideBarLeft.click({ button: 'left' })
  await ActivityBar.handleContextMenu()

  // assert
  const moveSideBarRight = Locator('.ContextMenuItem[title="Move Side Bar Right"]')
  await expect(moveSideBarRight).toBeVisible()
}
