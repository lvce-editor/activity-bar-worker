import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.run-and-debug'

export const skip = 1

export const test: Test = async ({ ActivityBar, ContextMenu, expect, Locator }) => {
  const runAndDebug = Locator('.ActivityBarItem[title="Run and Debug"]')
  await expect(runAndDebug).toBeVisible()

  await ActivityBar.handleContextMenu()

  const menuItem = Locator('.ContextMenuItem[title="Run And Debug"]')
  await expect(menuItem).toBeVisible()
  await ContextMenu.selectItem('Run And Debug')

  await expect(runAndDebug).toHaveCount(0)
}
