import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as SideBarLocationType from '../SideBarLocationType/SideBarLocationType.ts'

export const menuEntryMoveSideBar = (sideBarLocation: number): MenuEntry => {
  switch (sideBarLocation) {
    case SideBarLocationType.Left:
      return {
        command: 'Layout.moveSideBarRight',
        flags: MenuItemFlags.None,
        id: 'moveSideBarRight',
        label: ViewletActivityBarStrings.moveSideBarRight(),
      }
    case SideBarLocationType.Right:
      return {
        command: 'Layout.moveSideBarLeft',
        flags: MenuItemFlags.None,
        id: 'moveSideBarLeft',
        label: ViewletActivityBarStrings.moveSideBarLeft(),
      }
    default:
      throw new Error('unexpected side bar location')
  }
}
