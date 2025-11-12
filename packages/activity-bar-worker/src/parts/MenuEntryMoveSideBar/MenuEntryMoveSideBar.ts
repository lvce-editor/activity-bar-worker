import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ViewletActivityBarStrings from '../ActivityBarStrings/ActivityBarStrings.ts'
import * as SideBarLocationType from '../SideBarLocationType/SideBarLocationType.ts'

export const menuEntryMoveSideBar = (sideBarLocation: number): MenuEntry => {
  switch (sideBarLocation) {
    case SideBarLocationType.Left:
      return {
        id: 'moveSideBarRight',
        label: ViewletActivityBarStrings.moveSideBarRight(),
        flags: MenuItemFlags.None,
        command: 'Layout.moveSideBarRight',
      }
    case SideBarLocationType.Right:
      return {
        id: 'moveSideBarLeft',
        label: ViewletActivityBarStrings.moveSideBarLeft(),
        flags: MenuItemFlags.None,
        command: 'Layout.moveSideBarLeft',
      }
    default:
      throw new Error('unexpected side bar location')
  }
}
