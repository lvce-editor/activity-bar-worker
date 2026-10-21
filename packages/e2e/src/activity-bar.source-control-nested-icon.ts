import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.source-control-nested-icon'

export const test: Test = async ({ expect, Locator, SideBar }) => {
  const sourceControlItem = Locator('.ActivityBarItem[title="Source Control"]')
  await SideBar.open('Explorer')

  await sourceControlItem.click()
  await expect(sourceControlItem).toHaveAttribute('aria-selected', 'true')

  const sourceControlIcon = sourceControlItem.locator('.MaskIconSourceControl')
  await expect(sourceControlIcon).toBeVisible()
  await sourceControlIcon.click()
  await expect(sourceControlItem).toHaveAttribute('aria-selected', 'false')
}
