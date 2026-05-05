import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const handleClickSignOut = async (state: ActivityBarState): Promise<ActivityBarState> => {
  await RendererWorker.invoke('Layout.signOut')
  return state
}
