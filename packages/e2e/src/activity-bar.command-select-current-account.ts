import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-select-current-account'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusLast')
  await Command.execute('ActivityBar.focusPrevious')
  await Command.execute('ActivityBar.selectCurrent')

  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })
  await expect(signIn).toBeVisible()
}
