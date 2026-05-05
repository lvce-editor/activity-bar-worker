import { RendererWorker } from '@lvce-editor/rpc-registry'

const showSideBarView = async (id: string): Promise<void> => {
  await RendererWorker.invoke('SideBar.show', id)
}

const showHiddenSideBarView = async (id: string): Promise<void> => {
  await showSideBarView(id)
  // @ts-ignore
  await RendererWorker.invoke('Layout.showSideBar', /* id */ id)
}

export const show = async (sideBarVisible: boolean, id: string): Promise<void> => {
  if (sideBarVisible) {
    await showSideBarView(id)
    return
  }
  await showHiddenSideBarView(id)
}

export const hide = async (): Promise<void> => {
  await RendererWorker.invoke('Layout.hideSideBar')
}

export const toggle = async (id: string): Promise<void> => {
  await RendererWorker.invoke('Layout.toggleSideBarView', id)
}
