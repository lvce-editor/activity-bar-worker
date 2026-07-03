import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

const view = {
  icon: new URL('./missing.png', import.meta.url).href,
  id: 'test.views.customIconMissingImage',
  title: 'Custom Missing Image Icon',
}

const commandMap = {
  'ExtensionApi.getViewRegistrySnapshot'() {
    return {
      views: [view],
    }
  },
}

await WebWorkerRpcClient.create({ commandMap })
