import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-last-account-disabled'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.setAccountEnabled', false)
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusLast')

  const account = Locator('.ActivityBarItem[title="Account"]')
  const settings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(account).toHaveCount(0)
  await expect(settings).toHaveClass('FocusOutline')
}
