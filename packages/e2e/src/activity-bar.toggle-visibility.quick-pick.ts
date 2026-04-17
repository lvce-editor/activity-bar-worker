import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-visibility.quick-pick'

export const test: Test = async ({ expect, Locator, QuickPick }) => {
  const activityBar = Locator('.ActivityBar')
  const quickPick = Locator('.QuickPick')
  const toggleActivityBarCommand = '>Layout: Toggle Activity Bar'

  // assert
  await expect(activityBar).toBeVisible()

  // act
  await QuickPick.open()

  // assert
  await expect(quickPick).toBeVisible()

  // act
  await QuickPick.handleInput(toggleActivityBarCommand)
  await QuickPick.selectItem('Layout: Toggle Activity Bar')

  // assert
  await expect(activityBar).toBeHidden()

  // act
  await QuickPick.open()

  // assert
  await expect(quickPick).toBeVisible()

  // act
  await QuickPick.handleInput(toggleActivityBarCommand)
  await QuickPick.selectItem('Layout: Toggle Activity Bar')

  // assert
  await expect(activityBar).toBeVisible()
}
