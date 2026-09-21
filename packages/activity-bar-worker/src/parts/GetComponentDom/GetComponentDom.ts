import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

export const getComponentDom = (uid: number): readonly any[] => {
  const state = ActivityBarStates.get(uid).newState
  return renderItems(state, state)[2]
}
