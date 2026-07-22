import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.references-shown-after-find-all'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  const url = import.meta.resolve('../fixtures/sample.reference-provider-basic')
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(0, 6)

  await Editor.findAllReferences()

  const references = Locator('.ActivityBarItem[title="References"]')
  const referencesIcon = references.locator('.IconReferences')
  const sideBarTitle = Locator('.SideBarTitleAreaTitle')
  const locations = Locator('.Locations')
  await expect(references).toBeVisible()
  await expect(references).toHaveAttribute('aria-selected', 'true')
  await expect(referencesIcon).toBeVisible()
  await expect(sideBarTitle).toHaveText('References')
  await expect(locations).toBeVisible()
}
