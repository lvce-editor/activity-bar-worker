export interface MenuEntry {
  readonly args?: any
  readonly command: string
  readonly flags: number
  readonly id: string | number
  readonly label: string
}
