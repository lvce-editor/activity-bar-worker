import { WebWorkerRpcClient } from '@lvce-editor/rpc'

const views = [
  { id: 'test.activityBar.duplicate', title: 'Duplicate View One' },
  { id: 'test.activityBar.duplicate', title: 'Duplicate View Two' },
]

const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return { views }
  },
}

await WebWorkerRpcClient.create({ commandMap })
