import { MenuEntryId } from '@lvce-editor/constants'
import { ACCOUNT_MENU_ID } from '../HandleClickAccount/HandleClickAccount.ts'

export const getMenuEntryIds = (): readonly number[] => {
  return [MenuEntryId.ActivityBar, MenuEntryId.ActivityBarAdditionalViews, MenuEntryId.Settings, ACCOUNT_MENU_ID]
}
