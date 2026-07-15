import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return {
      views: [null, undefined, { id: 123 }, { id: 'test.activityBar.validAfterInvalid', title: 'Valid After Invalid' }],
    }
  },
}

await WebWorkerRpcClient.create({ commandMap })
