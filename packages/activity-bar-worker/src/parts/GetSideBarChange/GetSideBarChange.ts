interface SideBarChangeResult {
  readonly type: 'show' | 'hide' | 'switch'
  readonly viewletId: string
}

export const getSideBarChange = (sideBarVisible: boolean, currentViewletId: string, viewletId: string): SideBarChangeResult => {
  if (sideBarVisible) {
    if (currentViewletId === viewletId) {
      return {
        type: 'hide',
        viewletId,
      }
    }
    return {
      type: 'switch',
      viewletId,
    }
  }
  return {
    type: 'show',
    viewletId,
  }
}
