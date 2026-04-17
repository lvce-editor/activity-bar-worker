import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.toggle-sidebar.explorer'

export const test: Test = async ({ Command, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const sideBarHeaderTitle = Locator('.SideBarTitleAreaTitle')
  const waitForSideBarVisible = async (expected: boolean): Promise<void> => {
    for (let i = 0; i < 20; i++) {
      const sideBarVisible = await Command.execute('Layout.getSideBarVisible')
      if (sideBarVisible === expected) {
        return
      }
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    const sideBarVisible = await Command.execute('Layout.getSideBarVisible')
    throw new Error(`expected sidebar visibility to be ${expected} but was ${sideBarVisible}`)
  }

  await Command.execute('Layout.hideSideBar')
  await waitForSideBarVisible(false)

  await explorer.click({ button: 'left' })
  await waitForSideBarVisible(true)
  await expect(sideBarHeaderTitle).toHaveText('Explorer')

  await explorer.click({ button: 'left' })
  await waitForSideBarVisible(false)

  await explorer.click({ button: 'left' })
  await waitForSideBarVisible(true)
  await expect(sideBarHeaderTitle).toHaveText('Explorer')
}
