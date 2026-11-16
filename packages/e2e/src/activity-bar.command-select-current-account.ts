import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-select-current-account'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusLast')
  await ActivityBar.focusPrevious()
  await ActivityBar.selectCurrent()

  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  await expect(signIn).toBeVisible()
}
