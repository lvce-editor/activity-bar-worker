import { WebWorkerRpcClient } from '@lvce-editor/rpc'

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
