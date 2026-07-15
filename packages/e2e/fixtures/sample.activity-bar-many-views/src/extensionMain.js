import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

const views = Array.from({ length: 500 }, (_, index) => ({
  icon: 'symbol-beaker',
  id: `test.activityBar.manyViews.${index}`,
  title: `Stress View ${index}`,
}))

const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return { views }
  },
}

await WebWorkerRpcClient.create({ commandMap })
