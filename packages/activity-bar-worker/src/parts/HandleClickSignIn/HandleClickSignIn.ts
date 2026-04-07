import { AuthWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ActivityBarState } from '../ActivityBarState/ActivityBarState.ts'

export const handleClickSignIn = async (state: ActivityBarState): Promise<ActivityBarState> => {
  const { platform } = state
  const backendUrl = await RendererWorker.invoke('Layout.getBackendUrl')
  await AuthWorker.invoke('Auth.login', {
    backendUrl,
    platform,
  })
  return state
}
