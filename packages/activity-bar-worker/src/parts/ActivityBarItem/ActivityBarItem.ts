export interface ActivityBarItem {
  readonly badgeIcon: string
  readonly badgeText: string
  readonly customIconClass: string
  readonly customIconUrl: string
  readonly enabled: boolean
  readonly flags: number
  readonly hasPopup: boolean
  readonly icon: string
  readonly id: string // TODO should be number
  readonly keyShortcuts: string
  readonly preferredLocation: number
  readonly title: string
}
