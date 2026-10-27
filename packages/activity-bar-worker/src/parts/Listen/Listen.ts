import { RendererWorker } from '@lvce-editor/rpc-registry'
import { registerCommands } from '../ActivityBarStates/ActivityBarStates.ts'
import * as CommandMap from '../CommandMap/CommandMap.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await Promise.all([
    RendererWorker.initializeRendererWorkerForWorker(CommandMap.commandMap),
    RendererWorker.initializeExtensionManagementWorker(),
    RendererWorker.initializeDragAndDropWorker(),
  ])
}
