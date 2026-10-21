import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.resize-overflow-recovery'

export const test: Test = async ({ ActivityBar, ComponentState, expect, Locator }) => {
  const additionalViews = Locator('.ActivityBarItem[title="Additional Views"]')
  const search = Locator('.ActivityBarItem[title="Search"]')

  await ActivityBar.resize({
    height: 144,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(additionalViews).toBeVisible()

  const { uid } = await ComponentState.getComponent('ActivityBar')
  const { activityBarItems, itemHeight } = await ComponentState.getState<{
    readonly activityBarItems: readonly unknown[]
    readonly itemHeight: number
  }>(uid)
  await ActivityBar.resize({
    height: activityBarItems.length * itemHeight,
    width: 48,
    x: 0,
    y: 0,
  })

  await expect(additionalViews).toHaveCount(0)
  await expect(search).toBeVisible()
}
