import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.references-hide-and-reopen'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main }) => {
  const url = import.meta.resolve('../fixtures/sample.reference-provider-basic')
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(0, 6)
  await Editor.findAllReferences()
  const references = Locator('.ActivityBarItem[title="References"]')
  const sideBar = Locator('.SideBar')
  const sideBarTitle = Locator('.SideBarTitleAreaTitle')

  await Command.execute('ActivityBar.handleClickIndex', 0, 5, 0, 0)

  await expect(sideBar).toBeHidden()
  await expect(references).toBeVisible()
  await expect(references).toHaveAttribute('aria-selected', 'false')

  await Command.execute('ActivityBar.handleClickIndex', 0, 5, 0, 0)

  await expect(sideBar).toBeVisible()
  await expect(references).toHaveAttribute('aria-selected', 'true')
  await expect(sideBarTitle).toHaveText('References')
}
