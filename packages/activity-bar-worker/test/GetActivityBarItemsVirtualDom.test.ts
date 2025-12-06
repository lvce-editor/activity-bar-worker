import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetActivityBarItemsVirtualDom from '../src/parts/GetActivityBarItemsVirtualDom/GetActivityBarItemsVirtualDom.ts'

test('getVirtualDom returns empty array for empty items', () => {
  const result = GetActivityBarItemsVirtualDom.getVirtualDom([])

  expect(result).toEqual([])
})

test('getVirtualDom creates basic item without flags', () => {
  const items: readonly any[] = [
    {
      flags: 0,
      icon: 'Explorer',
      title: 'Explorer',
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
  const items: readonly any[] = [
    {
      flags: ActivityBarItemFlags.Tab,
      icon: 'Explorer',
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(1)
  expect(result[0].role).toBe(AriaRoles.Tab)
})

test('getVirtualDom creates selected item with icon', () => {
  const items: readonly any[] = [
    {
      flags: ActivityBarItemFlags.Selected,
      icon: 'Explorer',
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(2)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
  expect(result[0].childCount).toBe(1)
  expect(result[1].className).toBe('MaskIcon MaskIconExplorer')
})

test('getVirtualDom creates selected tab with icon', () => {
  const items: readonly any[] = [
    {
      flags: ActivityBarItemFlags.Tab | ActivityBarItemFlags.Selected,
      icon: 'Explorer',
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(2)
  expect(result[0].role).toBe(AriaRoles.Tab)
  expect(result[0].ariaSelected).toBe(true)
})

test('getVirtualDom creates item with Focused flag', () => {
  const items: readonly any[] = [
    {
      flags: ActivityBarItemFlags.Focused,
      icon: 'Explorer',
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.FocusOutline)
})

test('getVirtualDom creates item with MarginTop flag', () => {
  const items: readonly any[] = [
    {
      flags: ActivityBarItemFlags.MarginTop,
      icon: 'Explorer',
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
})

test('getVirtualDom creates item with Progress flag', () => {
  const items: readonly any[] = [
    {
      flags: ActivityBarItemFlags.Progress,
      icon: 'Explorer',
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(5)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemNested)
  expect(result[0].childCount).toBe(2)
})

test('getVirtualDom creates item with multiple flags', () => {
  const items: readonly any[] = [
    {
      flags: ActivityBarItemFlags.Focused | ActivityBarItemFlags.MarginTop | ActivityBarItemFlags.Selected,
      icon: 'Explorer',
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result[0].className).toContain(ClassNames.FocusOutline)
  expect(result[0].className).toContain(ClassNames.MarginTopAuto)
  expect(result[0].className).toContain(ClassNames.ActivityBarItemSelected)
})

test('getVirtualDom creates multiple items', () => {
  const items: readonly any[] = [
    {
      flags: 0,
      icon: 'Explorer',
      title: 'Explorer',
    },
    {
      flags: ActivityBarItemFlags.Selected,
      icon: 'Settings',
      title: 'Settings',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBe(3)
})

test('getVirtualDom handles item with all flags', () => {
  const items: readonly any[] = [
    {
      flags:
        ActivityBarItemFlags.Tab |
        ActivityBarItemFlags.Progress |
        ActivityBarItemFlags.Selected |
        ActivityBarItemFlags.Focused |
        ActivityBarItemFlags.MarginTop,
      icon: 'Explorer',
      title: 'Explorer',
    },
  ]

  const result = GetActivityBarItemsVirtualDom.getVirtualDom(items)

  expect(result.length).toBeGreaterThan(0)
})
