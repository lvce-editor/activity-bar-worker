import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.references-shown-after-find-all'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main }) => {
  await Command.execute('ActivityBar.resize', {
    height: 432,
    width: 48,
    x: 0,
    y: 0,
  })
  const url = import.meta.resolve('../fixtures/sample.reference-provider-basic')
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(0, 6)

  await Editor.findAllReferences()

  const explorer = Locator('.ActivityBarItem[title="Explorer"]')
  const references = Locator('.ActivityBarItem[title="References"]')
  const selectedItems = Locator('.ActivityBarItemSelected')
  const referencesIcon = references.locator('.MaskIconReferences')
  const sideBarTitle = Locator('.SideBarTitleAreaTitle')
  const locations = Locator('.Locations')
  await expect(explorer).toHaveAttribute('aria-selected', 'false')
  await expect(references).toBeVisible()
  await expect(references).toHaveAttribute('aria-selected', 'true')
  await expect(selectedItems).toHaveCount(1)
  await expect(referencesIcon).toBeVisible()
  await expect(sideBarTitle).toHaveText('References')
  await expect(locations).toBeVisible()
}
