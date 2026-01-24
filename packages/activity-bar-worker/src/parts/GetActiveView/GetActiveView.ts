import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ViewletModuleId from '../ViewletModuleId/ViewletModuleId.ts'

export const getActiveView = async (): Promise<string> => {
  try {
    const activeView = await RendererWorker.invoke('Layout.getActiveSideBarView')
    return activeView
  } catch {
    return ViewletModuleId.Explorer
  }
}
