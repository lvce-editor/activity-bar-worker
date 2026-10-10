import { cp, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/activity-bar-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

const rendererWorkerDistPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const workerPath = join(root, '.tmp/dist/dist/activityBarWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)

const occurrence = remoteUrl
const replacement = '${assetDir}/packages/activity-bar-worker/dist/activityBarWorkerMain.js'
let found = false
for (const name of await readdir(rendererWorkerDistPath)) {
  if (!name.endsWith('.js')) {
    continue
  }
  const filePath = join(rendererWorkerDistPath, name)
  const content = await readFile(filePath, 'utf8')
  if (content.includes(occurrence)) {
    found = true
    await writeFile(filePath, content.replaceAll(occurrence, replacement))
  }
}
if (!found) {
  throw new Error('occurrence not found')
}

const activityBarWorkerPath = join(root, 'dist', commitHash, 'packages', 'activity-bar-worker', 'dist', 'activityBarWorkerMain.js')
await cp(workerPath, activityBarWorkerPath)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
