import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetActivityBarItemsVirtualDom from '../src/parts/GetActivityBarItemsVirtualDom/GetActivityBarItemsVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getVirtualDom returns empty array for empty items', () => {
  const result = GetActivityBarItemsVirtualDom.getVirtualDom([])

  expect(result).toEqual([])
})

test('getVirtualDom creates basic item without flags', () => {
  const items = [
    {
      flags: 0,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(1)
  expect(result[0].type).toBe(VirtualDomElements.Div)
  expect(result[0].className).toBe('ActivityBarItem IconExplorer')
  expect(result[0].role).toBe(AriaRoles.Button)
  expect(result[0].childCount).toBe(0)
})

test('getVirtualDom creates item with Tab flag', () => {
  const items = [
    {
      flags: ActivityBarItemFlags.Tab,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(1)
  expect(result[0].role).toBe(AriaRoles.Tab)
})

test('getVirtualDom creates selected item with icon', () => {
  const items = [
    {
      flags: ActivityBarItemFlags.Selected,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(2)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
  expect(result[0].childCount).toBe(1)
  expect(result[1].className).toBe('MaskIcon MaskIconExplorer')
})

test('getVirtualDom creates selected tab with icon', () => {
  const items = [
    {
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(2)
  expect(result[0].role).toBe(AriaRoles.Tab)
  expect(result[0].ariaSelected).toBe(true)
})

test('getVirtualDom creates item with Focused flag', () => {
  const items = [
    {
      flags: ActivityBarItemFlags.Focused,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.FocusOutline)
})

test('getVirtualDom creates item with MarginTop flag', () => {
  const items = [
    {
      flags: ActivityBarItemFlags.MarginTop,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
})

test('getVirtualDom creates item with Progress flag', () => {
  const items = [
    {
      flags: ActivityBarItemFlags.Progress,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(5)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemNested)
  expect(result[0].childCount).toBe(2)
})

test('getVirtualDom creates item with multiple flags', () => {
  const items = [
    {
      flags: ActivityBarItemFlags.Focused | ActivityBarItemFlags.MarginTop | ActivityBarItemFlags.Selected,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.FocusOutline)
  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
})

test('getVirtualDom creates multiple items', () => {
  const items = [
    {
      flags: 0,
      title: 'Explorer',
      icon: 'Explorer',
    },
    {
      flags: ActivityBarItemFlags.Selected,
      title: 'Settings',
      icon: 'Settings',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(3)
})

test('getVirtualDom handles item with all flags', () => {
  const items = [
    {
      flags:
        ActivityBarItemFlags.Tab |
        ActivityBarItemFlags.Progress |
        ActivityBarItemFlags.Selected |
        ActivityBarItemFlags.Focused |
        ActivityBarItemFlags.MarginTop,
      title: 'Explorer',
      icon: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBeGreaterThan(0)
})
