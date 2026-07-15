import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return null
  },
}

await WebWorkerRpcClient.create({ commandMap })
