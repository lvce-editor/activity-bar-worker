export interface ActivityBarItem {
  readonly badgeIcon?: string
  readonly badgeText?: string
  readonly enabled?: boolean
  readonly flags: number
  readonly icon: string
  readonly id: string // TODO should be number
  readonly keyShortcuts: string
  readonly title: string
}
