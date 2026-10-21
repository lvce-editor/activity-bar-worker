// @ts-expect-error The runtime bundle is provided by the extension host.
const { WebWorkerRpcClient } = await import('/77a0e5a/js/lvce-editor-rpc.js')

let badgeCount = 1

const commandMap = {
  'ExtensionApi.executeCommand'() {
    badgeCount = 0
  },
  'ExtensionApi.executeSourceControlGetBadgeCount'() {
    return badgeCount
  },
  'ExtensionApi.executeSourceControlGetFeatures'() {
    return {}
  },
  'ExtensionApi.executeSourceControlGetGroups'() {
    return []
  },
  /**
   * @param {string} _id
   * @param {string} scheme
   */
  'ExtensionApi.executeSourceControlIsActive'(_id, scheme) {
    return scheme === 'memfs'
  },
  'ExtensionApi.getStatusBarItems'() {
    return []
  },
  'ExtensionApi.getSourceControlProviderRegistrySnapshot'() {
    return {
      providers: [
        {
          id: 'source-control-save-badge',
        },
      ],
    }
  },
  'ExtensionApi.getViewActions'() {
    return []
  },
  'ExtensionApi.getViewMenuEntries'() {
    return []
  },
  'ExtensionApi.getViewRegistrySnapshot'() {
    return {
      views: [],
    }
  },
}

await WebWorkerRpcClient.create({ commandMap })
