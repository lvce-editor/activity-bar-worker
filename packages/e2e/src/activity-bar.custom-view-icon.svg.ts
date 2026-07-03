import type { Test } from '@lvce-editor/test-with-playwright'
import { assertCustomViewIcon } from './_custom-view-icon.ts'

export const name = 'activity-bar.custom-view-icon.svg'
export const skip = 1

export const test: Test = async ({ Command, expect, Extension, Locator }) => {
  const uri = import.meta.resolve('../fixtures/sample.custom-view-icon-svg')
  await Extension.addWebExtension(uri)
  await Command.execute('ActivityBar.handleExtensionsChanged')
  await assertCustomViewIcon(
    { expect, Locator },
    {
      extensionUri: uri,
      iconPath: 'icon.svg',
      title: 'Custom SVG Icon',
      viewId: 'test.views.customIconSvg',
    },
  )
}
