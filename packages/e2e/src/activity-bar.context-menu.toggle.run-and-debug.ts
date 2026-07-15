import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.context-menu.toggle.run-and-debug'

export const test: Test = async ({ Command, ContextMenu, expect, Locator }) => {
  const runAndDebug = Locator('.ActivityBarItem[title="Run and Debug"]')
  await expect(runAndDebug).toBeVisible()

  await Command.execute('ActivityBar.handleContextMenu', 300, 300, 0, 0)

  const menuItem = Locator('.MenuItem', { hasText: 'Run And Debug' })
  await expect(menuItem).toBeVisible()
  await ContextMenu.selectItem('Run And Debug')

  await expect(runAndDebug).toHaveCount(0)
}
