import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account-disable-preserves-selected-view'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Search', true)
  await Command.execute('ActivityBar.setAccountEnabled', false)

  const account = Locator('.ActivityBarItem[title="Account"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(account).toHaveCount(0)
  await expect(search).toHaveAttribute('aria-selected', 'true')
  await expect(settings).toHaveClass('MarginTopAuto')
}
