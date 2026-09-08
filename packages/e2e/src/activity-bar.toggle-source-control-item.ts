import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-source-control-item'

export const test: Test = async ({ ActivityBar, ComponentState, expect, Locator }) => {
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  await ActivityBar.toggleActivityBarItem('Source Control')
  await expect(sourceControl).toHaveCount(0)

  await ActivityBar.toggleActivityBarItem('Source Control')
  try {
    await expect(sourceControl).toBeVisible()
  } catch (error) {
    const component = await ComponentState.getComponent('ActivityBar')
    const state = await ComponentState.getState(component.uid)
    throw new Error(`[DEBUG-pr500] ${JSON.stringify(state)}`, { cause: error })
  }
}
