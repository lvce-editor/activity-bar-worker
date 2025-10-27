import * as ExplorerStates from '../ActivityBarStates/ActivityBarStates.ts'
import * as DiffModules from '../DiffModules/DiffModules.ts'

export const diff2 = (uid: number): readonly number[] => {
  return ExplorerStates.diff(uid, DiffModules.modules, DiffModules.numbers)
}
