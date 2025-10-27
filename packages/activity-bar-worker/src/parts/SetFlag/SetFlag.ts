import type { ActivityBarItem } from '../ActivityBarItem/ActivityBarItem.ts'

export const setFlag = (item: ActivityBarItem, flag: number, enabled: boolean): ActivityBarItem => {
  return {
    ...item,
    flags: enabled ? item.flags | flag : item.flags & ~flag,
  }
}
