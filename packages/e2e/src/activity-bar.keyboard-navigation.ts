import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.keyboard-navigation'

export const test: Test = async ({ ActivityBar, Command, expect, KeyBoard, Locator }) => {
  await Command.execute('ActivityBar.handleFocus')

  // assert
  const activityBarItemExplorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(activityBarItemExplorer).toHaveClass('FocusOutline')
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')
  await expect(sideBarHeaderTitle).toHaveText('Explorer')

  // act
  await ActivityBar.focusNext()

  // assert
  const activityBarItemSearch = Locator('.ActivityBarItem[title="Search"]')
  await expect(activityBarItemSearch).toHaveClass('FocusOutline')

  // act
  await ActivityBar.focusPrevious()

  // assert
  await expect(activityBarItemExplorer).toHaveClass('FocusOutline')

  // act
  await ActivityBar.focusLast()

  // assert
  const activityBarItemSettings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(activityBarItemSettings).toHaveClass('FocusOutline')

  // act
  await ActivityBar.focusFirst()

  // assert
  await expect(activityBarItemExplorer).toHaveClass('FocusOutline')

  // act
  await ActivityBar.focusNext()
  await ActivityBar.selectCurrent()

  // assert
  await expect(sideBarHeaderTitle).toHaveText('Search')

  // act
  await Command.execute('ActivityBar.handleFocus')
  await expect(activityBarItemSearch).toHaveClass('FocusOutline')
  await ActivityBar.focusLast()
  await expect(activityBarItemSettings).toHaveClass('FocusOutline')
  await KeyBoard.press('Space')

  // assert
  const menu = Locator('#Menu-0')
  await expect(menu).toBeFocused()
}
