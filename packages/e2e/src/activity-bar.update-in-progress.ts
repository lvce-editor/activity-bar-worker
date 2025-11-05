import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.update-in-progress'

export const skip = 1

export const test: Test = async ({ Locator, expect, Command }) => {
  // assert
  const activityBar = Locator('.ActivityBar')
  await expect(activityBar).toBeVisible()

  // act
  await Command.execute('ActivityBar.handleUpdateStateChange', {
    state: 1,
    progress: 0,
  })

  // assert
}
