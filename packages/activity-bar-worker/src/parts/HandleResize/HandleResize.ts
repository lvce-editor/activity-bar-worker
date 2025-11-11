import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

// TODO
// 1. update dimensions
// 2. update activity bar items, depending on available height
// 3. render ellipsis with additional items if needed
interface Dimensions {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export const handleResize = (state: ActivityBarState, dimensions: Dimensions): ActivityBarState => {
  const { x, y, width, height } = dimensions

  return {
    ...state,
    x,
    y,
    width,
    // @ts-ignore
    height,
  }
}
