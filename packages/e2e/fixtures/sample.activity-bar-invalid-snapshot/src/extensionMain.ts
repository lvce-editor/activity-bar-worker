import { WebWorkerRpcClient } from '@lvce-editor/rpc'

const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return null
  },
}

const main = async (): Promise<void> => {
  await WebWorkerRpcClient.create({ commandMap })
}

main()
