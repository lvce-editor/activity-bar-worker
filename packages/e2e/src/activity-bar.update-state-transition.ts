import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.update-state-transition'

export const test: Test = async ({ ActivityBar, expect, Locator }) => {
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  const badge = settings.locator('.ActivityBarItemBadge')
  const progressIcon = badge.locator('.MaskIconProgress')

  await ActivityBar.setUpdateState({
    progress: 0,
    state: 1,
  })

  await expect(progressIcon).toBeVisible()

  await ActivityBar.setUpdateState({
    progress: 0,
    state: 4,
  })

  await expect(badge).toBeVisible()
  await expect(badge).toHaveText('1')
  await expect(progressIcon).toHaveCount(0)
}
