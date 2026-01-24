import type { MenuEntryId } from '@lvce-editor/constants'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsAdditionalViews extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ActivityBarAdditionalViews
  readonly viewletId: string
}

export interface ContextMenuPropsSettings extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.Settings
}

export interface ContextMenuPropsActivityBar extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ActivityBar
}

export interface ContextMenuPropsAccount extends ContextMenuPropsBase {
  readonly menuId: number
}

export type ContextMenuProps = ContextMenuPropsAdditionalViews | ContextMenuPropsSettings | ContextMenuPropsActivityBar | ContextMenuPropsAccount
