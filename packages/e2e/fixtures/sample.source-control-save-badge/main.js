import { activate, registerCommand, registerSourceControlProvider } from '@lvce-editor/api'

let badgeCount = 1

const main = async () => {
  await activate()

  registerSourceControlProvider({
    getBadgeCount() {
      return badgeCount
    },
    getChangedFiles() {
      return []
    },
    id: 'source-control-save-badge',
    isActive(scheme) {
      return scheme === 'memfs'
    },
  })

  registerCommand({
    execute() {
      badgeCount = 0
    },
    id: 'sourceControlSaveBadge.clear',
  })
}

main()
