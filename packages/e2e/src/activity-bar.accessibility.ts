import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.accessibility'

export const skip = 0

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
  await expect(activityBarItems).toHaveCount(8) // Explorer, Search, Source Control, Run & Debug, Extensions, Account, Settings, Update

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
  const runDebugItem = Locator('.ActivityBarItem[title="Run & Debug"]')
  await expect(runDebugItem).toBeVisible()
  await expect(runDebugItem).toHaveAttribute('role', 'tab')
  await expect(runDebugItem).toHaveAttribute('aria-selected', 'false')

  // Check fifth item (Extensions)
  const extensionsItem = Locator('.ActivityBarItem[title="Extensions"]')
  await expect(extensionsItem).toBeVisible()
  await expect(extensionsItem).toHaveAttribute('role', 'tab')
  await expect(extensionsItem).toHaveAttribute('aria-selected', 'false')

  // Check sixth item (Account)
  const accountItem = Locator('.ActivityBarItem[title="Account"]')
  await expect(accountItem).toBeVisible()
  await expect(accountItem).toHaveAttribute('role', 'tab')
  await expect(accountItem).toHaveAttribute('aria-selected', 'false')

  // Check seventh item (Settings)
  const settingsItem = Locator('.ActivityBarItem[title="Settings"]')
  await expect(settingsItem).toBeVisible()
  await expect(settingsItem).toHaveAttribute('role', 'tab')
  await expect(settingsItem).toHaveAttribute('aria-selected', 'false')

  // Check eighth item (Update)
  const updateItem = Locator('.ActivityBarItem[title="Update"]')
  await expect(updateItem).toBeVisible()
  await expect(updateItem).toHaveAttribute('role', 'tab')
  await expect(updateItem).toHaveAttribute('aria-selected', 'false')
}
