import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export interface ContextMenuHandler {
  (state: ActivityBarState, x: number, y: number): Promise<ActivityBarState>
}
