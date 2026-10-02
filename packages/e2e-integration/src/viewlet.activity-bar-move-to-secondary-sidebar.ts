import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.activity-bar-move-to-secondary-sidebar'

export const test: Test = async ({ Command, ContextMenu, expect, Locator, SideBar }) => {
  const explorerItem = Locator('.ActivityBarItem[title="Explorer"]')
  const sourceControlView = Locator('.SecondarySideBar .Viewlet.SourceControl')
  const primarySourceControlView = Locator('.SideBar:not(.SecondarySideBar) .Viewlet.SourceControl')
  const explorerView = Locator('.Viewlet.Explorer')
  const primarySearchView = Locator('.SideBar:not(.SecondarySideBar) .Viewlet.Search')
  const searchView = Locator('.SecondarySideBar .Viewlet.Search')

  await SideBar.open('Explorer')
  await Command.execute('ActivityBar.handleContextMenu', 2, 0, 0, 'Search')
  await expect(Locator('body')).toContainText('Move To')
  await ContextMenu.selectItem('Move To')
  await ContextMenu.selectItem('Secondary Side Bar')

  // The clicked item moves even though Explorer was the active primary view.
  await expect(explorerItem).toHaveAttribute('aria-selected', 'true')
  await expect(explorerView).toBeVisible()
  await expect(primarySearchView).toHaveCount(0)
  await expect(searchView).toBeVisible()
  const activePrimary = await Command.execute('Layout.getActiveSideBarView')
  const activeSecondary = await Command.execute('Layout.getActiveSecondarySideBarView')
  if (activePrimary !== 'Explorer') {
    throw new Error(`Expected Explorer to remain active in the primary sidebar, got ${activePrimary}`)
  }
  if (activeSecondary !== 'Search') {
    throw new Error(`Expected Search to open in the secondary sidebar, got ${activeSecondary}`)
  }

  // A second move stays in the secondary host without duplicating the primary view.
  await Command.execute('ActivityBar.handleContextMenu', 2, 0, 0, 'Source Control')
  await ContextMenu.selectItem('Move To')
  await ContextMenu.selectItem('Secondary Side Bar')
  await expect(primarySourceControlView).toHaveCount(0)
  await expect(sourceControlView).toBeVisible()
  const secondActiveSecondary = await Command.execute('Layout.getActiveSecondarySideBarView')
  if (secondActiveSecondary !== 'Source Control') {
    throw new Error(`Expected Source Control to move into the secondary sidebar, got ${secondActiveSecondary}`)
  }

  // Resizing and switching among multiple moved views preserves their location.
  await Command.execute('Layout.handleResize', 1024, 768)
  await Command.execute('ActivityBar.handleClick', 0, -1000, -1000, 'Search')
  await expect(searchView).toBeVisible()
  const switchedSecondary = await Command.execute('Layout.getActiveSecondarySideBarView')
  if (switchedSecondary !== 'Search') {
    throw new Error(`Expected Search to remain in the secondary sidebar after resize, got ${switchedSecondary}`)
  }

  // Hiding and reopening the moved activity item keeps it in the secondary host.
  await Command.execute('Layout.hideSecondarySideBar')
  await expect(searchView).toHaveCount(0)
  await Command.execute('ActivityBar.handleClick', 0, -1000, -1000, 'Search')
  await expect(searchView).toBeVisible()
  const reopenedSecondary = await Command.execute('Layout.getActiveSecondarySideBarView')
  if (reopenedSecondary !== 'Search') {
    throw new Error(`Expected Search to reopen in the secondary sidebar, got ${reopenedSecondary}`)
  }
}
