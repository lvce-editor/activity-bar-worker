import type { Test } from '@lvce-editor/test-with-playwright'
import { assertCustomViewIcon } from './_custom-view-icon.ts'

export const name = 'activity-bar.custom-view-icon.invalid-image'
export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  const uri = import.meta.resolve('../fixtures/sample.custom-view-icon-invalid-image')
  await Extension.addWebExtension(uri)
  await Command.execute('ActivityBar.handleExtensionsChanged')
  await assertCustomViewIcon(
    { expect, Locator },
    {
      extensionUri: uri,
      iconPath: 'invalid.png',
      title: 'Custom Invalid Image Icon',
      viewId: 'test.views.customIconInvalidImage',
    },
  )
}
