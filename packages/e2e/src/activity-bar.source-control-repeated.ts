import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.source-control-repeated'

export const test: Test = async ({ expect, Locator, SideBar }) => {
  const sourceControlItem = Locator('.ActivityBarItem[title="Source Control"]')
  const sourceControlView = Locator('.Viewlet.SourceControl')

  await SideBar.open('Explorer')
  await sourceControlItem.click()
  await expect(sourceControlItem).toHaveAttribute('aria-selected', 'true')
  await expect(sourceControlView).toBeVisible()

  await SideBar.open('Explorer')
  await expect(sourceControlItem).toHaveAttribute('aria-selected', 'false')
  await sourceControlItem.click()
  await expect(sourceControlItem).toHaveAttribute('aria-selected', 'true')
  await expect(sourceControlView).toBeVisible()
}
