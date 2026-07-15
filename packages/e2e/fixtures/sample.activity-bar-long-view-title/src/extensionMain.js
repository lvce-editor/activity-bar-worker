import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

const title = 'Activity Bar Long Title '.repeat(500)
const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return {
      views: [{ id: 'test.activityBar.longTitle', title }],
    }
  },
}

await WebWorkerRpcClient.create({ commandMap })
