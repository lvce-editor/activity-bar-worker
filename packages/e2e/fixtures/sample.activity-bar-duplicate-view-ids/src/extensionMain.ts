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

const main = async (): Promise<void> => {
  await WebWorkerRpcClient.create({ commandMap })
}

main()
