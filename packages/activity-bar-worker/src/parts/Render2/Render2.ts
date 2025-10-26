import * as ExplorerStates from '../ActivityBarStates/ActivityBarStates.ts'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly any[] => {
  const { oldState, newState } = ExplorerStates.get(uid)
  ExplorerStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
