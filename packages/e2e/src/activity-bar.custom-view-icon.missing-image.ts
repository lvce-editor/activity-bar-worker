import type { Test } from '@lvce-editor/test-with-playwright'
import { assertCustomViewIcon } from './_custom-view-icon.ts'

export const name = 'activity-bar.custom-view-icon.missing-image'

export const test: Test = async ({ Command, Extension, expect, Locator }) => {
  const uri = import.meta.resolve('../fixtures/sample.custom-view-icon-missing-image')
  await Extension.addWebExtension(uri)
  await Command.execute('ActivityBar.handleExtensionsChanged')
  await assertCustomViewIcon(
    { expect, Locator },
    {
      extensionUri: uri,
      iconPath: 'missing.png',
      title: 'Custom Missing Image Icon',
      viewId: 'test.views.customIconMissingImage',
    },
  )
}
