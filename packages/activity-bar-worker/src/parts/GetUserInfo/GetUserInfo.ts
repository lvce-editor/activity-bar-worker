import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getUserInfo = async (): Promise<unknown> => {
  try {
    return await RendererWorker.invoke('Layout.getUserInfo')
  } catch {
    return undefined
  }
}import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getUserInfo = async (): Promise<unknown> => {
  try {
    return await RendererWorker.invoke('Layout.getUserInfo')
  } catch {
    return undefined
  }
}