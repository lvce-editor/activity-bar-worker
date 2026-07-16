import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.settings-menu-preserves-selection'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const settingsMenuItem = Locator('.MenuItem', { hasText: 'Settings' })

  await ActivityBar.handleClickSettings(300, 300)

  await expect(settingsMenuItem).toBeVisible()
  await expect(explorer).toHaveAttribute('aria-selected', 'true')
}
