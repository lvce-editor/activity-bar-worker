import * as ActivityBarStates from '../ActivityBarStates/ActivityBarStates.ts'
import * as DiffModules from '../DiffModules/DiffModules.ts'

export const diff2 = (uid: number): readonly number[] => {
  return ActivityBarStates.diff(uid, DiffModules.modules, DiffModules.numbers)
}
