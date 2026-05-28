import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.move-side-bar-left-right'

export const skip = 1

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  const sideBarLeft = 1
  const sideBarRight = 2
  const waitForSideBarPosition = async (expected: number): Promise<void> => {
    for (let i = 0; i < 20; i++) {
      const sideBarPosition = await Command.execute('Layout.getSideBarPosition')
      if (sideBarPosition === expected) {
        return
      }
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    const sideBarPosition = await Command.execute('Layout.getSideBarPosition')
    throw new Error(`expected side bar position to be ${expected} but was ${sideBarPosition}`)
  }

  const moveSideBarLeft = Locator('.MenuItem', {
    hasText: 'Move Side Bar Left',
  })
  const moveSideBarRight = Locator('.MenuItem', {
    hasText: 'Move Side Bar Right',
  })

  // arrange
  await Command.execute('Layout.moveSideBarRight')
  await waitForSideBarPosition(sideBarRight)
  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarLeft).toBeVisible()

  // act
  await ContextMenu.selectItem('Move Side Bar Left')

  // assert
  await waitForSideBarPosition(sideBarLeft)
  await Command.execute('ActivityBar.handleSettingsChanged')
  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarRight).toBeVisible()

  await ContextMenu.selectItem('Move Side Bar Right')

  await waitForSideBarPosition(sideBarRight)
  await Command.execute('ActivityBar.handleSettingsChanged')
  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)
  await expect(moveSideBarLeft).toBeVisible()
}
