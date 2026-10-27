import { cp } from 'node:fs/promises'
import { join } from 'node:path'
import * as sharedProcess from '@lvce-editor/shared-process'
import { root } from './root.ts'

process.env.PATH_PREFIX = '/activity-bar-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const workerPath = join(root, '.tmp/dist/dist/activityBarWorkerMain.js')

const activityBarWorkerPath = join(root, 'dist', commitHash, 'packages', 'activity-bar-worker', 'dist', 'activityBarWorkerMain.js')
await cp(workerPath, activityBarWorkerPath)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
