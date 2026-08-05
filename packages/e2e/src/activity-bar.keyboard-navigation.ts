import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.activity-bar-keyboard-navigation'

export const skip = 1

export const test: Test = async ({ ActivityBar, expect, KeyBoard, Locator }) => {
  await ActivityBar.focus()

  const activityBar = Locator('.ActivityBar')
  const activityBarItemExplorer = Locator('.ActivityBarItem[title="Explorer"]')
  const activityBarItemSearch = Locator('.ActivityBarItem[title="Search"]')
  const activityBarItemSettings = Locator('.ActivityBarItem[title="Settings"]')
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')

  await expect(activityBar).toBeFocused()
  await expect(activityBarItemExplorer).toHaveClass('FocusOutline')

  await KeyBoard.press('ArrowDown')
  await expect(activityBarItemSearch).toHaveClass('FocusOutline')

  await KeyBoard.press('Enter')
  await expect(sideBarHeaderTitle).toHaveText('Search')

  await ActivityBar.focus()
  await KeyBoard.press('Home')
  await expect(activityBarItemExplorer).toHaveClass('FocusOutline')

  await KeyBoard.press('End')
  await expect(activityBarItemSettings).toHaveClass('FocusOutline')

  await KeyBoard.press('Space')
  const menu = Locator('#Menu-0')
  await expect(menu).toBeVisible()
}
