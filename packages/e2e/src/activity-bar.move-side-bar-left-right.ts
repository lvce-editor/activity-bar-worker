import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.move-side-bar-left-right'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  const activityBarLeft = Locator('.ContentArea > .ActivityBar:first-child')
  const activityBarRight = Locator('.ContentArea > .ActivityBar:last-child')

  const moveSideBarLeft = Locator('.MenuItem', {
    hasText: 'Move Side Bar Left',
  })
  const moveSideBarRight = Locator('.MenuItem', {
    hasText: 'Move Side Bar Right',
  })

  // arrange
  await Command.execute('Layout.moveSideBarRight')
  await expect(activityBarRight).toBeVisible()
  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarLeft).toBeVisible()

  // act
  await ContextMenu.selectItem('Move Side Bar Left')

  // assert
  await expect(activityBarLeft).toBeVisible()
  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarRight).toBeVisible()

  await ContextMenu.selectItem('Move Side Bar Right')

  await expect(activityBarRight).toBeVisible()
  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarLeft).toBeVisible()
}
