import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'activity-bar.references-not-duplicated'

export const test: Test = async ({ Editor, expect, Extension, FileSystem, Locator, Main }) => {
  const url = import.meta.resolve('../fixtures/sample.reference-provider-basic')
  await Extension.addWebExtension(url)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.xyz`, 'const value = 1\n')
  await Main.openUri(`${tmpDir}/test.xyz`)
  await Editor.setCursor(0, 6)

  await Editor.findAllReferences()
  await Editor.findAllReferences()

  const references = Locator('.ActivityBarItem[title="References"]')
  await expect(references).toHaveCount(1)
  await expect(references).toBeVisible()
  await expect(references).toHaveAttribute('aria-selected', 'true')
}
