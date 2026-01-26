import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import type { ActivityBarItem } from '../src/parts/ActivityBarItem/ActivityBarItem.ts'
import * as ActivityBarItemFlags from '../src/parts/ActivityBarItemFlags/ActivityBarItemFlags.ts'
import { toContextMenuItem } from '../src/parts/ToContextMenuItem/ToContextMenuItem.ts'

test('toContextMenuItem creates menu entry with correct command', () => {
  const item: ActivityBarItem = {
    flags: ActivityBarItemFlags.Enabled,
    icon: 'explorer',
    id: 'Explorer',
    keyShortcuts: '',
    title: 'Explorer',
  }

  const result = toContextMenuItem(item)

  expect(result.command).toBe('ActivityBar.toggleActivityBarItem')
  expect(result.id).toBe('toggle-Explorer')
  expect(result.label).toBe('Explorer')
  expect(result.args).toEqual(['Explorer'])
})

test('toContextMenuItem marks enabled items as checked', () => {
  const item: ActivityBarItem = {
    flags: ActivityBarItemFlags.Enabled,
    icon: 'search',
    id: 'Search',
    keyShortcuts: '',
    title: 'Search',
  }

  const result = toContextMenuItem(item)

  expect(result.flags).toBe(MenuItemFlags.Checked)
})

test('toContextMenuItem marks disabled items as unchecked', () => {
  const item: ActivityBarItem = {
    flags: 0,
    icon: 'git',
    id: 'Source Control',
    keyShortcuts: '',
    title: 'Source Control',
  }

  const result = toContextMenuItem(item)

  expect(result.flags).toBe(MenuItemFlags.Unchecked)
})

test('toContextMenuItem generates unique ids for different items', () => {
  const item1: ActivityBarItem = {
    flags: ActivityBarItemFlags.Enabled,
    icon: 'icon1',
    id: 'Item1',
    keyShortcuts: '',
    title: 'Item 1',
  }
  const item2: ActivityBarItem = {
    flags: ActivityBarItemFlags.Enabled,
    icon: 'icon2',
    id: 'Item2',
    keyShortcuts: '',
    title: 'Item 2',
  }

  const result1 = toContextMenuItem(item1)
  const result2 = toContextMenuItem(item2)

  expect(result1.id).not.toBe(result2.id)
  expect(result1.id).toBe('toggle-Item1')
  expect(result2.id).toBe('toggle-Item2')
})

test('toContextMenuItem passes item id as argument', () => {
  const item: ActivityBarItem = {
    flags: ActivityBarItemFlags.Enabled,
    icon: 'debug',
    id: 'Debug',
    keyShortcuts: '',
    title: 'Debug',
  }

  const result = toContextMenuItem(item)

  expect(result.args).toBeDefined()
  expect(result.args).toEqual(['Debug'])
  expect(result.args[0]).toBe('Debug')
})

test('toContextMenuItem preserves item label from id', () => {
  const item: ActivityBarItem = {
    flags: ActivityBarItemFlags.Enabled,
    icon: 'debug',
    id: 'Run and Debug',
    keyShortcuts: '',
    title: 'Run and Debug Panel',
  }

  const result = toContextMenuItem(item)

  expect(result.label).toBe('Run and Debug')
})
