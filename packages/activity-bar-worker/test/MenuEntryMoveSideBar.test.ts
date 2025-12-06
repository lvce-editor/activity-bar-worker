import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import * as ViewletActivityBarStrings from '../src/parts/ActivityBarStrings/ActivityBarStrings.ts'
import { menuEntryMoveSideBar } from '../src/parts/MenuEntryMoveSideBar/MenuEntryMoveSideBar.ts'
import * as SideBarLocationType from '../src/parts/SideBarLocationType/SideBarLocationType.ts'

test('menuEntryMoveSideBar returns correct menu entry for Left side bar location', () => {
  const result = menuEntryMoveSideBar(SideBarLocationType.Left)

  expect(result).toEqual({
    command: 'Layout.moveSideBarRight',
    flags: MenuItemFlags.None,
    id: 'moveSideBarRight',
    label: ViewletActivityBarStrings.moveSideBarRight(),
  })
})

test('menuEntryMoveSideBar returns correct menu entry for Right side bar location', () => {
  const result = menuEntryMoveSideBar(SideBarLocationType.Right)

  expect(result).toEqual({
    command: 'Layout.moveSideBarLeft',
    flags: MenuItemFlags.None,
    id: 'moveSideBarLeft',
    label: ViewletActivityBarStrings.moveSideBarLeft(),
  })
})

test('menuEntryMoveSideBar throws error for unexpected side bar location', () => {
  expect(() => {
    menuEntryMoveSideBar(0)
  }).toThrow('unexpected side bar location')

  expect(() => {
    menuEntryMoveSideBar(3)
  }).toThrow('unexpected side bar location')
})
