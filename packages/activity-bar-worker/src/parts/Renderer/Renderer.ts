import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export interface Renderer {
  (oldState: ActivityBarState, newState: ActivityBarState): readonly any[]
}
