import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.keyboard-navigation'

export const test: Test = async ({ Command, ComponentState, expect, KeyBoard, Locator }) => {
  const { uid } = await ComponentState.getComponent('ActivityBar')
  const activityBar = Locator('#ActivityBar')
  const focusActivityBar = async (): Promise<void> => {
    await Command.execute('Viewlet.focusSelector', uid, '#ActivityBar')
    await expect(activityBar).toBeFocused()
    await Command.execute('ActivityBar.handleFocus')
  }

  // act
  await focusActivityBar()

  // assert
  await expect(activityBar).toHaveCSS('outline-style', 'none')
  const activityBarItemExplorer = Locator('.ActivityBarItem[title="Explorer"]')
  await expect(activityBarItemExplorer).toHaveClass('FocusOutline')
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')
  await expect(sideBarHeaderTitle).toHaveText('Explorer')

  // act
  await KeyBoard.press('ArrowDown')

  // assert
  const activityBarItemSearch = Locator('.ActivityBarItem[title="Search"]')
  await expect(activityBarItemSearch).toHaveClass('FocusOutline')

  // act
  await KeyBoard.press('ArrowUp')

  // assert
  await expect(activityBarItemExplorer).toHaveClass('FocusOutline')

  // act
  await focusActivityBar()
  await KeyBoard.press('End')

  // assert
  const activityBarItemSettings = Locator('.ActivityBarItem[title="Settings"]')
  await expect(activityBarItemSettings).toHaveClass('FocusOutline')

  // act
  await KeyBoard.press('Home')

  // assert
  await expect(activityBarItemExplorer).toHaveClass('FocusOutline')

  // act
  await KeyBoard.press('ArrowDown')
  await KeyBoard.press('Enter')

  // assert
  await expect(sideBarHeaderTitle).toHaveText('Search')

  // act
  await focusActivityBar()
  await expect(activityBarItemSearch).toHaveClass('FocusOutline')
  await focusActivityBar()
  await KeyBoard.press('End')
  await expect(activityBarItemSettings).toHaveClass('FocusOutline')
  await KeyBoard.press('Space')

  // assert
  const menu = Locator('#Menu-0')
  await expect(menu).toBeFocused()
}
