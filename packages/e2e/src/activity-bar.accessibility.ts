import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.accessibility'

export const test: Test = async ({ expect, Locator }) => {
  // Test activity bar accessibility attributes
  const activityBar = Locator('.ActivityBar')
  await expect(activityBar).toBeVisible()
  await expect(activityBar).toHaveAttribute('role', 'toolbar')
  await expect(activityBar).toHaveAttribute('aria-roledescription', 'Activity Bar')
  await expect(activityBar).toHaveAttribute('aria-orientation', 'vertical')
  await expect(activityBar).toHaveAttribute('tabindex', '0')

  // Test activity bar items (tabs) accessibility attributes
  const activityBarItems = Locator('.ActivityBarItem')
  await expect(activityBarItems).toHaveCount(6)

  // Check first item (Explorer)
  const explorerItem = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(explorerItem).toBeVisible()
  await expect(explorerItem).toHaveAttribute('role', 'tab')
  await expect(explorerItem).toHaveAttribute('aria-selected', 'true')

  // Check second item (Search)
  const searchItem = Locator('.ActivityBarItem[title="Search"]')
  await expect(searchItem).toBeVisible()
  await expect(searchItem).toHaveAttribute('role', 'tab')
  await expect(searchItem).toHaveAttribute('aria-selected', 'false')

  // Check third item (Source Control)
  const sourceControlItem = Locator('.ActivityBarItem[title="Source Control"]')
  await expect(sourceControlItem).toBeVisible()
  await expect(sourceControlItem).toHaveAttribute('role', 'tab')
  await expect(sourceControlItem).toHaveAttribute('aria-selected', 'false')

  // Check fourth item (Run & Debug)
  const runDebugItem = Locator('.ActivityBarItem[title="Run and Debug"]')
  await expect(runDebugItem).toBeVisible()
  await expect(runDebugItem).toHaveAttribute('role', 'tab')
  await expect(runDebugItem).toHaveAttribute('aria-selected', 'false')

  // Check fifth item (Extensions)
  const extensionsItem = Locator('.ActivityBarItem[title="Extensions"]')
  await expect(extensionsItem).toBeVisible()
  await expect(extensionsItem).toHaveAttribute('role', 'tab')
  await expect(extensionsItem).toHaveAttribute('aria-selected', 'false')

  // Check sixth item (Settings)
  const settingsItem = Locator('.ActivityBarItem[title="Settings"]')
  await expect(settingsItem).toBeVisible()
  await expect(settingsItem).toHaveAttribute('role', 'button')
  await expect(settingsItem).toHaveAttribute('aria-haspopup', 'true')
  await expect(settingsItem).toHaveAttribute('aria-selected', null)

  const accountItem = Locator('.ActivityBarItem[title="Account"]')
  await expect(accountItem).toHaveCount(0)

  const updateItem = Locator('.ActivityBarItem[title="Update"]')
  await expect(updateItem).toHaveCount(0)
}
