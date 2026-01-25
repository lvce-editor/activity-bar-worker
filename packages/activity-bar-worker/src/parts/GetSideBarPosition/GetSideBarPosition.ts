import { SideBarLocationType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getSideBarPosition = async (): Promise<number> => {
  try {
    return await RendererWorker.invoke('Layout.getSideBarPosition')
  } catch {
    return SideBarLocationType.Left
  }
}
