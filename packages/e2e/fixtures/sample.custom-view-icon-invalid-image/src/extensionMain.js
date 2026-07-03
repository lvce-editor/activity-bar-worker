import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

const view = {
  icon: new URL('./invalid.png', import.meta.url).href,
  id: 'test.views.customIconInvalidImage',
  title: 'Custom Invalid Image Icon',
}

const commandMap = {
  'ExtensionApi.getViewRegistrySnapshot'() {
    return {
      views: [view],
    }
  },
}

await WebWorkerRpcClient.create({ commandMap })
