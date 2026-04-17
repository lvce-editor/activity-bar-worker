import { RendererWorker } from '@lvce-editor/rpc-registry'

export const toggle = async (id: string): Promise<void> => {
  await RendererWorker.invoke('Layout.toggleSideBarView', id)
}

export const show = async (_sideBarVisible: boolean, id: string): Promise<void> => {
  await RendererWorker.invoke('Layout.showSideBar', id)
}

export const hide = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.hideSideBar')
}
