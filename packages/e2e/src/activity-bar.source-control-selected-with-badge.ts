import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.source-control-selected-with-badge'

export const test: Test = async ({ Command, expect, Locator, SideBar }) => {
  const sourceControlItem = Locator('.ActivityBarItem[title="Source Control"]')
  const badge = sourceControlItem.locator('.ActivityBarItemBadge')
  await Command.execute('Layout.setBadgeCount', 'Source Control', 2)
  await SideBar.open('Explorer')

  await sourceControlItem.click()
  await expect(sourceControlItem).toHaveAttribute('aria-selected', 'true')

  await expect(badge).toHaveText('2')
  await expect(badge).toHaveCSS('contain', 'strict')
  await expect(sourceControlItem).toHaveCSS('background-color', 'rgb(31, 39, 39)')
}
