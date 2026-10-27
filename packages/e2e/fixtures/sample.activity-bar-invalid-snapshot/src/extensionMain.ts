import { WebWorkerRpcClient } from '@lvce-editor/rpc'

const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return null
  },
}

await WebWorkerRpcClient.create({ commandMap })
