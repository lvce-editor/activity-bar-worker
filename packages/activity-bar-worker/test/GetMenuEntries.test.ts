import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import type { ActivityBarState } from '../src/parts/ActivityBarState/ActivityBarState.ts'
import type { ContextMenuProps } from '../src/parts/ContextMenuProps/ContextMenuProps.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import * as SideBarLocationType from '../src/parts/SideBarLocationType/SideBarLocationType.ts'

test('getMenuEntries returns menu entries for ActivityBar menuId', () => {
  const state: ActivityBarState = {
    ...createDefaultState(),
    sideBarLocation: SideBarLocationType.Left,
  }
  const options: ContextMenuProps = {
    menuId: MenuEntryId.ActivityBar,
  }

  const result = getMenuEntries(state, options)

  expect(result.length).toBeGreaterThan(0)
  expect(result[result.length - 1].command).toBe('Layout.hideActivityBar')
})

test('getMenuEntries returns menu entries for ActivityBarAdditionalViews menuId', () => {
  const state: ActivityBarState = createDefaultState()
  const options: ContextMenuProps = {
    menuId: MenuEntryId.ActivityBarAdditionalViews,
    viewletId: 'test-viewlet',
  }

  const result = getMenuEntries(state, options)

  expect(Array.isArray(result)).toBe(true)
})

test('getMenuEntries returns menu entries for Settings menuId', () => {
  const state: ActivityBarState = createDefaultState()
  const options: ContextMenuProps = {
    menuId: MenuEntryId.Settings,
  }

  const result = getMenuEntries(state, options)

  expect(result.length).toBeGreaterThan(0)
  expect(result[0].command).toBe('QuickPick.showEverything')
})

test('getMenuEntries returns empty array for unknown menuId', () => {
  const state: ActivityBarState = createDefaultState()
  const options: ContextMenuProps = {
    menuId: 9999 as any,
  }

  const result = getMenuEntries(state, options)

  expect(result).toEqual([])
})
