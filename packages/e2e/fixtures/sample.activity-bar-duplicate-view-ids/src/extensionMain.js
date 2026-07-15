import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

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
