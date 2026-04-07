import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.additional-views-menu'

export const test: Test = async ({ Command, expect, Locator }) => {
  await Command.execute('ActivityBar.resize', {
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })

  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  await additionalViews.click({ button: 'left' })

  const search = Locator('.ContextMenuItem[title="Search"]')
  const extensions = Locator('.ContextMenuItem[title="Extensions"]')

  await expect(search).toBeVisible()
  await expect(extensions).toBeVisible()
}
