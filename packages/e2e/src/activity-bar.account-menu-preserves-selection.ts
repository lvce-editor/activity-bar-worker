import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.account-menu-preserves-selection'

export const test: Test = async ({ ActivityBar, Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const signIn = Locator('.MenuItem', { hasText: 'Sign In' })

  await ActivityBar.setAccountEnabled(true)
  await Command.execute('ActivityBar.handleClickAccount', 300, 300)

  await expect(signIn).toBeVisible()
  await expect(explorer).toHaveAttribute('aria-selected', 'true')
}
