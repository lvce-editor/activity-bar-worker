import * as ActivityBarItemLocation from '../ActivityBarItemLocation/ActivityBarItemLocation.ts'

export const getActivityBarItemLocation = (preferredLocation: string | undefined): number => {
  switch (preferredLocation) {
    case 'preview':
      return ActivityBarItemLocation.Preview
    case 'sideBar':
      return ActivityBarItemLocation.SideBar
    default:
      return ActivityBarItemLocation.Default
  }
}
