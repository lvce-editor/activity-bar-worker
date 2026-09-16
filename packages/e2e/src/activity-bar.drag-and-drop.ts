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

  // The drag event must originate from the real draggable DOM node.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
  const firstActivityBarItem = Locator('.ActivityBarItem').nth(0)
  const secondActivityBarItem = Locator('.ActivityBarItem').nth(1)
  const thirdActivityBarItem = Locator('.ActivityBarItem').nth(2)
  await expect(firstActivityBarItem).toHaveAttribute('title', 'Search')
  await expect(secondActivityBarItem).toHaveAttribute('title', 'Source Control')
  await expect(thirdActivityBarItem).toHaveAttribute('title', 'Explorer')

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  await explorer.dispatchEvent('dragstart', { bubbles: true } as any)
  await Command.execute('ActivityBar.handleDragOver', 24)
  await expect(indicator).toHaveCount(0)
  await Command.execute('ActivityBar.handleDragEnd')
}
