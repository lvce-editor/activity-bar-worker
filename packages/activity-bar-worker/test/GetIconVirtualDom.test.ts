import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetIconVirtualDom from '../src/parts/GetIconVirtualDom/GetIconVirtualDom.ts'

test('getIconVirtualDom returns correct VirtualDomNode with default type', () => {
  const icon = 'Explorer'
  const result = GetIconVirtualDom.getIconVirtualDom(icon)

  expect(result.type).toBe(VirtualDomElements.Div)
  expect(result.className).toBe('MaskIcon MaskIconExplorer')
  expect(result.role).toBe(AriaRoles.None)
  expect(result.childCount).toBe(0)
})

test('getIconVirtualDom returns correct className for different icons', () => {
  const result1 = GetIconVirtualDom.getIconVirtualDom('Settings')
  const result2 = GetIconVirtualDom.getIconVirtualDom('Search')
  const result3 = GetIconVirtualDom.getIconVirtualDom('Git')

  expect(result1.className).toBe('MaskIcon MaskIconSettings')
  expect(result2.className).toBe('MaskIcon MaskIconSearch')
  expect(result3.className).toBe('MaskIcon MaskIconGit')
})

test('getIconVirtualDom accepts custom type parameter', () => {
  const icon = 'TestIcon'
  const customType = 5
  const result = GetIconVirtualDom.getIconVirtualDom(icon, customType)

  expect(result.type).toBe(customType)
  expect(result.className).toBe('MaskIcon MaskIconTestIcon')
  expect(result.role).toBe(AriaRoles.None)
  expect(result.childCount).toBe(0)
})

test('getIconVirtualDom returns correct role', () => {
  const result = GetIconVirtualDom.getIconVirtualDom('AnyIcon')

  expect(result.role).toBe(AriaRoles.None)
})

test('getIconVirtualDom returns childCount of 0', () => {
  const result = GetIconVirtualDom.getIconVirtualDom('Icon')

  expect(result.childCount).toBe(0)
})

test('getIconVirtualDom handles empty string icon', () => {
  const result = GetIconVirtualDom.getIconVirtualDom('')

  expect(result.className).toBe('MaskIcon MaskIcon')
  expect(result.role).toBe(AriaRoles.None)
  expect(result.childCount).toBe(0)
})
