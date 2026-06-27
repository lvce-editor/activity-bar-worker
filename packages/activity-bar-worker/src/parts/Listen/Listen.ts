import { registerCommands } from '../ActivityBarStates/ActivityBarStates.ts'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeAuthWorker } from '../InitializeAuthWorker/InitializeAuthWorker.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'

export const listen = async (): Promise<void> => {
  registerCommands(CommandMap.commandMap)
  await Promise.all([initializeRendererWorker(), initializeAuthWorker()])
}
