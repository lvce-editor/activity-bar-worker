import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { ACCOUNT_SUBMENU_ID } from '../src/parts/GetMenuEntriesAccount/GetMenuEntriesAccount.ts'
import { getMenuEntryIds } from '../src/parts/GetMenuEntryIds/GetMenuEntryIds.ts'
import { ACCOUNT_MENU_ID } from '../src/parts/HandleClickAccount/HandleClickAccount.ts'

test('getMenuEntryIds returns correct array of menu entry IDs', () => {
  const result: readonly number[] = getMenuEntryIds()

  expect(result).toEqual([MenuEntryId.ActivityBar, MenuEntryId.ActivityBarAdditionalViews, MenuEntryId.Settings, ACCOUNT_MENU_ID, ACCOUNT_SUBMENU_ID])
})

test('getMenuEntryIds returns array with correct length', () => {
  const result: readonly number[] = getMenuEntryIds()

  expect(result.length).toBe(5)
})

test('getMenuEntryIds contains ActivityBar menu entry ID', () => {
  const result: readonly number[] = getMenuEntryIds()

  expect(result).toContain(MenuEntryId.ActivityBar)
})

test('getMenuEntryIds contains ActivityBarAdditionalViews menu entry ID', () => {
  const result: readonly number[] = getMenuEntryIds()

  expect(result).toContain(MenuEntryId.ActivityBarAdditionalViews)
})

test('getMenuEntryIds contains Settings menu entry ID', () => {
  const result: readonly number[] = getMenuEntryIds()

  expect(result).toContain(MenuEntryId.Settings)
})

test('getMenuEntryIds contains Account menu entry ID', () => {
  const result: readonly number[] = getMenuEntryIds()

  expect(result).toContain(ACCOUNT_MENU_ID)
})

test('getMenuEntryIds contains Account submenu entry ID', () => {
  const result: readonly number[] = getMenuEntryIds()

  expect(result).toContain(ACCOUNT_SUBMENU_ID)
})
