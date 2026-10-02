import type { MenuEntryId } from '@lvce-editor/constants'

export interface ContextMenuPropsBase {
  readonly menuId: number
}

export interface ContextMenuPropsAdditionalViews extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ActivityBarAdditionalViews
  readonly openSubMenuToLeft?: boolean
  readonly viewletId: string
  readonly action?: 'moveTo'
}

export interface ContextMenuPropsSettings extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.Settings
}

export interface ContextMenuPropsActivityBar extends ContextMenuPropsBase {
  readonly menuId: typeof MenuEntryId.ActivityBar
  readonly targetViewletId?: string
}

export interface ContextMenuPropsAccount extends ContextMenuPropsBase {
  readonly menuId: number
  readonly openSubMenuToLeft?: boolean
}

export type ContextMenuProps = ContextMenuPropsAdditionalViews | ContextMenuPropsSettings | ContextMenuPropsActivityBar | ContextMenuPropsAccount
