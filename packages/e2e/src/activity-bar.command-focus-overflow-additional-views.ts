import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.command-focus-overflow-additional-views'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })
  await Command.execute('ActivityBar.handleFocus')
  await Command.execute('ActivityBar.focusNext')

  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  await expect(additionalViews).toHaveAttribute('role', 'button')
  await expect(additionalViews).toHaveClass('FocusOutline')
}
