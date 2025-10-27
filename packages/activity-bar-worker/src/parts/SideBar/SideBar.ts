import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show = async (id: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('Layout.showSideBar', /* id */ id)
}

export const hide = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.hideSideBar')
}
