import { WebWorkerRpcClient } from '/7c12bd7/js/lvce-editor-rpc.js'

const view = {
  icon: new URL('./icon.svg', import.meta.url).href,
  id: 'test.views.customIconSvg',
  title: 'Custom SVG Icon',
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
