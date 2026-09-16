import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.drag-and-drop'

export const test: Test = async ({ Command, DragAndDrop, expect, Locator }) => {
  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const search = Locator('.ActivityBarItem[title="Search"]')
  const sourceControl = Locator('.ActivityBarItem[title="Source Control"]')
  const runAndDebug = Locator('.ActivityBarItem[title="Run and Debug"]')
  const indicator = Locator('.ActivityBarItem[style*="box-shadow"]')

  await expect(explorer).toHaveJSProperty('draggable', false)

  await Command.execute('ActivityBar.setDragAndDropEnabled', true)
  await expect(explorer).toHaveJSProperty('draggable', true)

  await explorer.dispatchEvent('dragstart', { bubbles: true } as any)
  await DragAndDrop.shouldHaveDragData([
    {
      data: 'application/x-lvce-editor-activity-bar-item:Explorer',
      type: 'application/x-lvce-editor-activity-bar-item',
    },
  ])

  await Command.execute('ActivityBar.handleDragOver', 167)
  await expect(indicator).toHaveCount(1)
  await expect(runAndDebug).toHaveAttribute('style', 'box-shadow: white 0px 2px 0px inset;')

  const dropId = await DragAndDrop.createDropSessionFromDragData()
  await Command.execute('ActivityBar.handleDrop', dropId)
  await expect(indicator).toHaveCount(0)
  await expect(search).toHaveCount(1)
  await expect(sourceControl).toHaveCount(1)
  await expect(explorer).toHaveCount(1)
  await expect(Locator('.ActivityBarItem').nth(0)).toHaveAttribute('title', 'Search')
  await expect(Locator('.ActivityBarItem').nth(1)).toHaveAttribute('title', 'Source Control')
  await expect(Locator('.ActivityBarItem').nth(2)).toHaveAttribute('title', 'Explorer')

  await explorer.dispatchEvent('dragstart', { bubbles: true } as any)
  await Command.execute('ActivityBar.handleDragOver', 24)
  await expect(indicator).toHaveCount(0)
  await Command.execute('ActivityBar.handleDragEnd')
}
