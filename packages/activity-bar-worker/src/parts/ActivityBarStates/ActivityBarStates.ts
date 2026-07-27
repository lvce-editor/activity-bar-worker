import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const { diff, get, getCommandIds, registerCommands, set, wrapAsyncCommand, wrapCommand, wrapGetter } =
  ViewletRegistry.create<ActivityBarState>()
