import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

const view = {
  icon: new URL('./icon.png', import.meta.url).href,
  id: 'test.views.customIconTinyPng',
  title: 'Custom Tiny PNG Icon',
}

const commandMap = {
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return {
      views: [view],
    }
  },
}

await WebWorkerRpcClient.create({ commandMap })
