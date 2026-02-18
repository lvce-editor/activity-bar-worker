import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getSideBarVisible = async (): Promise<boolean> => {
  try {
    const visible = await RendererWorker.invoke('Layout.getSideBarVisible')
    return visible
  } catch {
    return true
  }
}
