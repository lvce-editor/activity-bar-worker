import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.update-unknown-state'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleUpdateStateChange', {
    progress: -1,
    state: 999,
  })

  const activityBar = Locator('.ActivityBar')
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  const badge = settings.locator('.ActivityBarItemBadge')

  await expect(activityBar).toBeVisible()
  await expect(settings).toBeVisible()
  await expect(settings).toHaveClass('IconSettingsGear')
  await expect(badge).toHaveCount(0)
}
