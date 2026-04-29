import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.explorer'

export const test: Test = async ({ Command, expect, Locator }) => {
  // assert
  await Command.execute('Layout.hideSideBar')
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorer).toBeVisible()
  await expect(explorer).toHaveClass('IconFiles')
}
