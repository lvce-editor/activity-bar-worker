export interface VisibleItem {
  readonly title: string
  readonly icon: string
  readonly isTab: boolean
  readonly isSelected: boolean
  readonly isFocused: boolean
  readonly isProgress: boolean
  readonly hasMarginTop: boolean
}
