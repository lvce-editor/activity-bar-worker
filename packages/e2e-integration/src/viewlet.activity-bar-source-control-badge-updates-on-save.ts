import type { Test } from '@lvce-editor/test-with-playwright'

const trailingSlashPattern = /\/$/

export const name = 'viewlet.activity-bar-source-control-badge-updates-on-save'

export const test: Test = async ({ ActivityBar, Command, Editor, expect, Extension, FileSystem, Locator, Main, SourceControl, Workspace }) => {
  const tmpDir = await FileSystem.getTmpDir()
  const uri = `${tmpDir}/settings.json`
  await FileSystem.writeFile(uri, '{}')
  await Workspace.setUri(tmpDir)

  const extensionUri = new URL('../fixtures/sample.source-control-save-badge', import.meta.url).href.replace(trailingSlashPattern, '')
  await Extension.addWebExtension(extensionUri)
  await Extension.enableWorkspace('sample.source-control-save-badge')
  await ActivityBar.handleExtensionsChanged()
  const activationResult = await Command.execute('ExtensionManagement.activateByEvent', 'onSourceControl:memfs', '', 0)
  if (activationResult.error) {
    throw activationResult.error
  }
  await Command.execute('Layout.handleExtensionsChanged')
  await SourceControl.show()

  const sourceControlItem = Locator('.ActivityBarItem[title="Source Control"]')
  const sourceControlBadge = sourceControlItem.locator('.ActivityBarItemBadge')
  await expect(sourceControlBadge).toHaveText('1')

  await Main.openUri(uri)
  await Editor.setCursor(0, 1)
  await Editor.type(' ')
  await Command.execute('ExtensionHost.executeCommand', 'sourceControlSaveBadge.clear')
  await Main.save()

  await expect(sourceControlBadge).toHaveCount(0)
  const badgeCounts = await Command.execute('Layout.getBadgeCounts')
  if (badgeCounts['Source Control'] !== 0) {
    throw new Error(`Expected source control badge count to be 0, got ${badgeCounts['Source Control']}`)
  }
}
