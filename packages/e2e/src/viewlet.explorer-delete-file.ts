import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'viewlet.explorer-delete-last-file'

export const test: Test = async ({ FileSystem, Workspace, Explorer, Locator, expect }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/file1.txt`, 'content 1')
  await FileSystem.writeFile(`${tmpDir}/file2.txt`, 'content 2')
  await FileSystem.writeFile(`${tmpDir}/file3.txt`, 'content 3')
  await Workspace.setPath(tmpDir)
  await Explorer.focusFirst()

  // act
  await Explorer.removeDirent()

  // assert
  const file1 = Locator('text=file1.txt')
  await expect(file1).toBeHidden()
  const listItems = Locator('.Explorer .ListItems')
  await expect(listItems).toBeFocused()
  // TODO explorer should have focus outline
}
