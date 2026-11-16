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

const main = async (): Promise<void> => {
  await WebWorkerRpcClient.create({ commandMap })
}

main()
