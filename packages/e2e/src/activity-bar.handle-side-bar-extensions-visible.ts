import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.handle-side-bar-extensions-visible'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleSideBarStateChange', 'Extensions', true)

  const extensions = Locator('.ActivityBarItem[title="Extensions"]')
  await expect(extensions).toHaveAttribute('aria-selected', 'true')
}
