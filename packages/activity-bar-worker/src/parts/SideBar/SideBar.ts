import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show = async (sideBarVisible: boolean, id: string): Promise<void> => {
  if (sideBarVisible) {
    await RendererWorker.invoke('SideBar.show', id)
  } else {
    await RendererWorker.invoke('SideBar.show', id)
    // @ts-ignore
    await RendererWorker.invoke('Layout.showSideBar', /* id */ id)
  }
}

export const hide = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.hideSideBar')
}

export const toggle = async (id: string): Promise<void> => {
  await RendererWorker.invoke('Layout.toggleSideBarView', id)
}
