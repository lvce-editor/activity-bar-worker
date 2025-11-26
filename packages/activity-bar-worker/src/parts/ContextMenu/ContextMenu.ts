import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show2 = async (uid: number, menuId: any, x: number, y: number, args: any): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('ContextMenu.show2', uid, menuId, x, y, args)
}
