import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { AuthWorker, RendererWorker } from '@lvce-editor/rpc-registry'

const send = async (port: MessagePort): Promise<void> => {
  // @ts-ignore
  await RendererWorker.sendMessagePortToAuthWorker(port)
}

export const listen = async (): Promise<void> => {
  const rpc = await LazyTransferMessagePortRpcParent.create({
    commandMap: {},
    send,
  })
  AuthWorker.set(rpc)
}
