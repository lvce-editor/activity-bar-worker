import * as ViewletRegistry from '@lvce-editor//viewlet-registry'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const { get, set, registerCommands, getCommandIds, wrapGetter, wrapCommand, diff } = ViewletRegistry.create<ActivityBarState>()
